/**
 * Created by Hutber on 04/02/14.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dv'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	// The default sex view view ----------------------------------------------------------
	SD.defaultSexView = function(){
		//set up homeview
		var sexView = SD.defaultView.extend({
			el: 'page',
			template: JST['app/www/js/templates/sexTemplate.ejs'],
			ownView: JST['app/www/js/templates/sex.ejs'],
			dataChecker: function(data){
				//------ this function is called from within a 'sex' view and the data, if the same type of data is passed from the sex view it over writes the default. ------------------------------------------------------
				if(typeof data !=="undefined"){
					//Loop through the sexdefaults and then cross check them against the sex views data, if the sex view has some data that we have update the SD.defaults
					for	(var index in SD.SEXDEFAULTS) {
						if(typeof data[index] !== "undefined"){
							SD.SEXDEFAULTS[index] = data[index];
						}
					}
				}
				//return the updateed sexdefaults build from the SD.SEXDEFAULTS and the data supplied from the view
				return SD.SEXDEFAULTS;
			},
			openASex: function(el){ //Define the click events for the sex details page
				var name = el.currentTarget.localName,myself = $(el.currentTarget);
				switch (name){
					case "when":
						$('when').scroller('show');
						break;
					case "who":
						SD.pageLoad('who');
						break;
					case "rating":
						this.rating($(el.target).parent());
						break;
					case "location":
						if(SD.SEXDEFAULTS.location[1] === "Click to get your location"){
							SD.overlay.showme('Please wait for us to find you');
							navigator.geolocation.getCurrentPosition(function(details){
								SD.locationSucess(details);
							}, function(details){
								SD.locationFail(details);
							});
						}
						break;
					case "where":
						SD.pageLoad('where');
						break;
					case "extra":
						c('extra');
						break;
					case "save":
						var errorYes = true, me = $(el.currentTarget), disabled = me.hasClass('disabled');

						if(SD.SEXDEFAULTS.sexnumber===0 || SD.SEXDEFAULTS.sexnumber==="" || typeof SD.SEXDEFAULTS.sexnumber=== "undefined"){
							SD.message.showMessage('Somehow a category of sex has not been selected', 'notice');
							errorYes = false;
						}

						if(disabled && SD.SEXDEFAULTS.sextime===0 || SD.SEXDEFAULTS.sextime==="" || typeof SD.SEXDEFAULTS.sextime=== "undefined"){
							SD.message.showMessage('This is technically impossble, but a time hasn\'t been set', 'notice');
							errorYes = false;
						}

						if(disabled && SD.SEXDEFAULTS.rating===0 || SD.SEXDEFAULTS.rating==="" || typeof SD.SEXDEFAULTS.rating=== "undefined"){
							SD.message.showMessage('Set a rating maybe? You don\'t have to, would be nice though', 'notice');
							me.removeClass('disabled');
							errorYes = false;
						}

						if(disabled && SD.SEXDEFAULTS.location[0]===false){
							SD.message.showMessage('You know we can record where u fucking fucked, click it', 'notice');
							me.removeClass('disabled');
							errorYes = false;
						}

						if(disabled &&
							SD.SEXDEFAULTS.where.length===0 || SD.SEXDEFAULTS.where==="" || typeof SD.SEXDEFAULTS.where=== "undefined"){
							SD.message.showMessage('Bit boring if you don\'t set where you did it', 'notice');
							me.removeClass('disabled');
							errorYes = false;
						}

						//If we have no errors save the sex
						if(errorYes) SD.addSex.save();
						break;
				}
			},
			rating: function(myself){
				//set up a rating
				var currentIndex, finalIndex;

				//If no rating has been set, quickly grab settings from the global
				if(typeof myself ==="undefined"){
					currentIndex = SD.SEXDEFAULTS.rating,
						finalIndex = --currentIndex,
						currentIndex = finalIndex;
				}else{
					//If a rating has been set then we are in the view of an already set rating
					currentIndex = myself.index();

					//frist remove all classes
					$('face.selected').removeAttr('class');

					myself.addClass('selected');
				}

				$('rating face').each(function(){
					if($(this).index()<= currentIndex){
						$(this).addClass('selected');
					}
				});

				if(typeof myself !=="undefined"){
					finalIndex = ++currentIndex;
					SD.SEXDEFAULTS.rating = finalIndex;
				}
			},
			loadSaveSex: {
				that: this,
				//Load in a save default sex
				pre: function(){
					//TODO add more script if statement
					if (!$('.royalSlider').length){
						$('sexnav .selected').removeClass('selected');
						//if we have the sex nav open on load select the correct class
						$('div[data-type='+window.location.hash.substring(1)+']').addClass('selected');
					}
				},
				//Load in a save default sex after html has been complied
				post: function(){
					//update correct sexnumber in SD.SEXDEFAULTS.sexnumber
					var sexnumber = $('sexnav .selected').index();
					SD.SEXDEFAULTS.sexnumber = ++sexnumber;

					//Display the correct rating
					SD.DSV.rating();


					//Time date picker
					$('when').mobiscroll({
						preset: 'datetime',
						dateFormat: 'DD d M yy',
						timeFormat: 'H:ii',
						maxDate: new Date(),
						ampm: false,
//						height: SD.pageHeight/20,
						dateOrder: 'dMyy',
						onSelect: function(el) {
							$('when date').html(el);
							SD.SEXDEFAULTS.sextime[1] = el,
								SD.SEXDEFAULTS.sextime[2] = SD.SEXDEFAULTS.sextime[0].values;
						},
						onBeforeShow: function(){
							if(SD.SEXDEFAULTS.sextime[0]){
								SD.SEXDEFAULTS.sextime[0].setValue(SD.SEXDEFAULTS.sextime[2]);
							}
						}
					});
					SD.SEXDEFAULTS.sextime[0] = $('when').mobiscroll('getInst'),
					SD.SEXDEFAULTS.sextime[1] = SD.SEXDEFAULTS.sextime[0].val;
					$('when date').html(SD.SEXDEFAULTS.sextime[1]);
				}
			},
			render: function (data) {
				//Check to see if we have a value
				if(typeof data === "undefined"){
					data = SD.SEXDEFAULTS;
				}

				//----- The global sex render --------------------------------------------------
				//update the website with the current view
				var compiled = this.template();
				this.$el.html(compiled);

				//Check are we a details page or the sex selection page
				if(SD.CURRENTSEX === "na"){
					$('sexdetails').html();
				}else{
					this.loadSaveSex.pre();

					//Update generated html with new updated details
					$('sexdetails').html(SD.DSV.ownView(data));

					this.loadSaveSex.post();
				}
			}
		});

		SD.DSV = new sexView();
//		SD.DSV.render();
		return sexView;
	}();
});