/**
 * Created by Hutber on 04/02/14.
 */
define([
	'dv',
	'mobiscroll',
	'mobiscrollScroller',
	'mobiscrollDate',
	'mobiscrollDuration',
	'mboi',
], function () {
	'use strict';

	var createMobile = arguments[5];

	// The default sex view view ----------------------------------------------------------
	SD.defaultSexView = function(){
		//set up homeview
		var sexView = SD.defaultView.extend({
			el: 'page',
			template: JST['templates/sexTemplate.ejs'],
			ownView: JST['templates/sex.ejs'],
			openASex: function(el){ //Define the click events for the sex details page
				var name = el.currentTarget.localName;
				if(name !== 'date')
				this[name](el);
			},
			sextime: function(){
				$('sextime').scroller('show');
			},
			who: function(){
				SD.pageLoad('who');
			},
			rating: function(el){
				//set up a rating
				var currentIndex, finalIndex;

				if(typeof el !=="undefined")
					var myself = $(el.target).parent();

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
			location: function(){
				if(SD.SEXDEFAULTS.location[1] === "Click to get your location"){
					SD.spinner.show('Please wait for us to find you', null, true);
					navigator.geolocation.getCurrentPosition(function(details){
						SD.location.locationSucess(details);
					}, function(details){
						SD.location.locationFail(details);
					});
				}else if(SD.SEXDEFAULTS.edit === true && SD.SEXDEFAULTS.location[1] !== "Click to get your location"){
					alert('Editing location is coming soon. Sorry for the wait.');
//					if(confirm('This will overwrite your old location if you click save.')){
//						SD.spinner.show('Please wait for us to find you', null, true);
//						navigator.geolocation.getCurrentPosition(function(details){
//							SD.locationSucess(details);
//						}, function(details){
//							SD.locationFail(details);
//						});
//					}
				}
			},
			place: function(){
				SD.pageLoad('place');
			},
			entry: function(){
				SD.pageLoad('diary');
			},
			extra: function(){
				SD.pageLoad('extra');
			},
			position: function(){
				SD.pageLoad('positions');
			},
			duration: function(){
				$('duration').scroller('show');
			},
			i: function(){
				this.moreBelow.moveToBottom();
			},
			save: function(el){
				var errorYes = true, me = $(el.currentTarget), disabled = me.hasClass('disabled');

				if(SD.SEXDEFAULTS.sexnumber===0 || SD.SEXDEFAULTS.sexnumber==="" || typeof SD.SEXDEFAULTS.sexnumber=== "undefined"){
					SD.message.showMessage('Somehow a category of sex has not been selected', 'notice');
					errorYes = false;
				}

				if(SD.SEXDEFAULTS.sextime===0 || SD.SEXDEFAULTS.sextime==="" || typeof SD.SEXDEFAULTS.sextime=== "undefined"){
					SD.message.showMessage('This is technically impossble, but a time hasn\'t been set', 'notice');
					errorYes = false;
				}

				if(disabled && SD.SEXDEFAULTS.rating===0 || SD.SEXDEFAULTS.rating==="" || typeof SD.SEXDEFAULTS.rating=== "undefined"){
					SD.message.showMessage('Set a rating maybe? You don\'t have to, would be nice though', 'notice');
					me.removeClass('disabled');
					errorYes = false;
				}

//				if(disabled && SD.SEXDEFAULTS.location[0]===false){
//					SD.message.showMessage('You know we can record place u fucking fucked, click it', 'notice');
//					me.removeClass('disabled');
//					errorYes = false;
//				}

//				if(disabled && SD.SEXDEFAULTS.place.length===0 || SD.SEXDEFAULTS.place==="" || typeof SD.SEXDEFAULTS.place=== "undefined"){
//					SD.message.showMessage('Bit boring if you don\'t set where you did it', 'notice');
//					me.removeClass('disabled');
//					errorYes = false;
//				}

				//If we have no errors save the sex
				if(errorYes) {SD.sex.save();}
			},
			//adujst the height of the sexdetails so that we can scroll
			moreBelow: {
				init: function(){
					var myself = this;
					this.force = function(){if(typeof myself.force === "undefined"){return true;}}(); //Only on first init do we define this true
					this.page = $('page');
					this.sexForm = $('sexform').outerHeight();
					this.sexSave = $('save').outerHeight();
					this.sexDetails = $('sexdetails').outerHeight();
					this.pageHeight = this.page.outerHeight();
					this.icon = $('.icon-down-open');
					this.check();
				},
				check: function(force){
					if(this.force===true && force===true) { //Check the this.force is true only once and that force is true from the scroll
						this.force = false;
						this.init();
					}
					if( this.page.scrollTop() > (this.sexDetails-this.sexSave-this.pageHeight) || this.sexForm < this.pageHeight) {
						this.icon.hide();
					}else{
						this.icon.show();
					}
				},
				moveToBottom: function(){
					this.page.scrollTop(this.pageHeight);
				}
			},
			// #DataChecker is used in the sex views/sex/*.js if the same type of data is passed from the sex view it over writes the default. ---------------------------------------
			dataChecker: function(data){
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
					SD.SEXDEFAULTS.sexnumber = $('sexnav .selected').index();
//					SD.SEXDEFAULTS.sexnumber = ++sexnumber;
//
					//Display the correct rating
					SD.DSV.rating();

					/******************************************************************
					*						Bof Set up mobi scrolls
					*****************************************************************/
					var when = new createMobile();
					when.target = 'sextime';
					when.settings = {
						preset: 'datetime',
						dateFormat: 'DD d M yy',
						timeFormat: 'H:ii',
						maxDate: new Date(),
						ampm: false,
						height: SD.pageHeight/10,
						dateOrder: 'dMyy',
						onSelect: function(el, results) {
							$('sextime date').html(el);
							SD.SEXDEFAULTS.sextime[0] = results,
							SD.SEXDEFAULTS.sextime[1] = results.values;
						}
					};
					when.init();

					//# Duration picker ----------------------------------------------
					var duration = new createMobile();
					duration.target = 'duration';
					duration.settings = {
						theme: 'default',
						display: 'modal',
						mode:'scroller',
						height: SD.pageHeight/15,
						durationWheels: ['hours', 'minutes'],
						defaults: [0,0],
						onShow: function(el){
							if(SD.SEXDEFAULTS.duration[1][0] === 0 && SD.SEXDEFAULTS.duration[1][1] === 0) {
								$('.dwv').html('0 Minutes');
							}
						},
						onSelect: function(el, results) {
							if(el === ""){
								$('duration date').html('');
							}else{
								$('duration date').html(el);
								SD.SEXDEFAULTS.duration[0] = results,
								SD.SEXDEFAULTS.duration[1] = results.values;
							}
						}
					};
					duration.init();

					/******************************************************************
					*						Eof Set up mobi scrolls
					*****************************************************************/
				}
			},
			render: function (data) {
				//Check to see if we have already entered sex details, if not grab them from locally stored details
				if(typeof data === "undefined"){
					data = SD.SEXDEFAULTS;
				}

//				if(SD.PREVIOUSHASH === "userhistory"){
//					//Resetsexdefaults back to default if we can from a page that isn't the history page.
//					data = SD.sex.sexDefaults();
//				}

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

//				var below = this.moreBelow;
//				below.init();
//				$('page').scroll(function(){below.check(true);});
//				$(window).resize(function(){below.init();});
			}
		});

		SD.DSV = new sexView();
		return sexView;
	}();
});