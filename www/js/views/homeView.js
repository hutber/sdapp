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
			c(myself.template);
			SD.templates.home = myself.template;
			SD.setTitle('SELECT SOME SEXYNESS');
			myself.$el.html(myself.template);
			c(myself.$el);
			var si = $('.royalSlider').royalSlider({
				controlNavigation: 'thumbnails',
				arrowsNavHideOnTouch: true,
				globalCaption: true,
				globalCaptionInside: true,
				imageScaleMode: 'fit',
				arrowsNav: false,
				imageScalePadding: 10,
				thumbs: {
					arrows: false,
					appendSpan: false,
					firstMargin: false
				},
//				addActiveClass: true,
//				arrowsNav: false,
//				controlNavigation: 'none',
//				loop: true,
//				fadeinLoadedSlide: false,
//				globalCaption: true,
//				keyboardNavEnabled: true,
//				globalCaptionInside: false,
//				autoScaleSlider: true,
//				autoScaleSliderWidth: 480,
//				autoScaleSliderHeight: 400,
//				imgHeight: 200,
//				visibleNearby: {
//					enabled: true,
//					centerArea: 0.5,
//					center: true,
//					breakpoint: 650,
//					breakpointCenterArea: 0.64,
//					navigateByCenterClick: false
//				}
			}).data('royalSlider');
			si.ev.on('rsSlideClick', function() { //Add click events to the sex icons
				c($('.rsGCaption').find('anchor').attr('id'));
				SD.pageLoad($('.rsGCaption').find('anchor').attr('id'));
			});
        },
		changeSex: function(elem){
			SD.pageLoad(elem);
		}
    });
    return HomeView;
});