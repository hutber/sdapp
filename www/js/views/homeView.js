define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'core.functions',
	'sd.functions',
	'dv',
	'slider',
], function ($, _, Backbone, JST, core, SD) {
    'use strict';

	//set up homeview
    var HomeView = SD.defaultView.extend({
		el: 'page',
        template: JST[
			'app/www/js/templates/home.ejs'
		],
        render: function () {
			SD.setTitle('SELECT SOME SEXYNESS');
			this.$el.html(this.template);

			SD.SLIDER = $('.royalSlider').royalSlider({ //Set up slider
				controlNavigation: 'none',
				arrowsNavHideOnTouch: true,
				globalCaption: true,
				globalCaptionInside: true,
				imageScaleMode: 'fit',
				arrowsNav: false,
				thumbs: {
					arrows: false,
					appendSpan: false,
					firstMargin: false,
					autoCenter: false,
					spacing: 5
				}
			}).data('royalSlider');

			//if we have the sex nav open on load select the correct class
			if(SD.SEXDEFAULTS.sextype === "default"){
				$('div[data-type=wank]').addClass('selected');
			} else{
				//Now navigate to current selection
				SD.SLIDER.goTo($('sexnav div.selected').index());
			}

			SD.SLIDER.ev.on('rsSlideClick', function() { //Add click events to the sex icons
				SD.pageLoad($('.rsGCaption').find('anchor').attr('id'));
			});

			SD.SLIDER.ev.on('rsAfterSlideChange', function(event) {
				if($('.royalSlider')[0]){
					//make sure no elements have any selected items
					$('sexnav div').removeClass('selected');

					//Work out current ID
					var currentSex = $(SD.SLIDER.currSlide.caption).attr('id');

					//update current sex with the class
					$('div[data-type='+currentSex+']').addClass('selected');
				}
			});

        }
    });
    return HomeView;
});