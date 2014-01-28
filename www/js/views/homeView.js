define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'core.functions',
	'sd.functions',
	'slider',
	'slidervisibleNearby',
	'sliderthumbnails',
	'sliderCaption'
], function ($, _, Backbone, JST, core, SD) {
    'use strict';

	//set up homeview
    var HomeView = SD.defaultView.extend({
		el: 'page',
        template: JST[
			'app/www/js/templates/home.ejs'
		],
		events:{
			"click anchor" : 'changeSex'
		},
        render: function () {
			var myself = this;
			SD.templates.home = myself.template;
			SD.setTitle('SELECT SOME SEXYNESS');
			myself.$el.html(myself.template);

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
			SD.SLIDER.ev.on('rsSlideClick', function() { //Add click events to the sex icons
				SD.pageLoad($('.rsGCaption').find('anchor').attr('id'));
			});

        },
		changeSex: function(elem){
			SD.pageLoad(elem);
		}
    });
    return HomeView;
});