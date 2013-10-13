define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../core.functions',
	'../sd.functions',
	'touchCarousel'
], function ($, _, Backbone, JST, core, SD) {
    'use strict';

	//set up homeview
    var HomeView = SD.defaultView.extend({
		el: 'page',
        template: JST[
			'js/templates/home.ejs'
		],
		events:{
			"click anchor" : 'changeSex'
		},
        render: function () {
			SD.templates.home = this.template;
            this.$el.html(this.template);
			var si = $('.royalSlider').royalSlider({
				addActiveClass: true,
				arrowsNav: false,
				controlNavigation: 'none',
				loop: true,
				fadeinLoadedSlide: false,
				globalCaption: true,
				keyboardNavEnabled: true,
				globalCaptionInside: false,
				autoScaleSlider: true,
				autoScaleSliderWidth: 480,
				autoScaleSliderHeight: 215,
				visibleNearby: {
					enabled: true,
					centerArea: 0.5,
					center: true,
					breakpoint: 650,
					breakpointCenterArea: 0.64,
					navigateByCenterClick: true
				}
			}).data('royalSlider');
        },
		changeSex: function(elem){
			Backbone.history.loadUrl(elem.currentTarget.id);
			window.location.href = '#'+elem.currentTarget.id;
		}
    });
    return HomeView;
});