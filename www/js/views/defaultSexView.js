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

c(SD.defaultView);
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

					//Check to see if the datetime has been set before, if it hasn't add the default date time
					if(SD.SEXDETAILS.datetime.length === 0){
						SD.SEXDEFAULTS.sextime =  $.scroller.formatDate('DD d M yy H:ii', $.scroller.parseDate());
					}else{
						SD.SEXDEFAULTS.sextime = SD.SEXDETAILS.datetime;
					}
				}
				return SD.SEXDEFAULTS;
			},
			openASex: function(el){ //Define the click events for the sex details page
				var name = el.currentTarget.localName;
				switch (name){
					case "when":
						$('when').scroller('show');
						break;
					case "who":
						this.who(el);
						break;
					case "rating":
						c('ating');
						break;
					case "location":
						c('location');
						break;
					case "where":
						c('where');
						break;
					case "extra":
						c('extra');
						break;
					case "save":
						c('save');
						break;
				}
			},
			who: function(el){
				SD.pageLoad('who');
			},
			loadSaveSex: function(){
				//TODO write us a way to be able to save defaults
				//Load into the date hidden field the current date.
				$('#date').val($.scroller.formatDate('DD d M yy H:ii', $.scroller.parseDate()));
			},
			render: function (data) {
				//----- The global sex render --------------------------------------------------

				//update the website with the current view
				var compiled = this.template();
				this.$el.html(compiled);

				if (!$('.royalSlider').length){
					$('sexnav .selected').removeClass('selected')
					//if we have the sex nav open on load select the correct class
					$('div[data-type='+window.location.hash.substring(1)+']').addClass('selected');
				}

				//If we are coming to the view for the first time
				if(SD.CURRENTSEX === "na"){
					$('sexdetails').html();
				//We have been to another page and have pressed back to get here.
				}else{
					$('sexdetails').html(SD.DSV.ownView(data));

					//Load in a save default sex
					this.loadSaveSex();

					//Time date picker
					$('when').scroller({
						preset: 'datetime',
						dateFormat: 'DD d M yy',
						timeFormat: 'H:ii',
						lang: 'en-GB',
						maxDate: new Date(),
						ampm: false,
						dateOrder: 'dMyy',
						onSelect: function() {
							var currentTime = $('.dwv').html();
							$('when date').html(currentTime);
							SD.SEXDETAILS.datetime = currentTime;
							//update hidden field with selected date
							$('#date').val(currentTime);
						}
					});
				}

			},
		});

		SD.DSV = new sexView();
		SD.DSV.render();
		return sexView;
	}();
});