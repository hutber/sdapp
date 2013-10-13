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
			'app/www/js/templates/home.ejs'
		],
		events:{
			"click anchor" : 'changeSex'
		},
        render: function () {
			var myself = this;
			SD.templates.home = myself.template;
			myself.$el.html(myself.template);
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
					navigateByCenterClick: false
				}
			}).data('royalSlider');
			si.ev.on('rsSlideClick', function() { //Add click events to the sex icons
				myself.changeSex($('.rsGCaption').find('anchor').attr('id'));
			});
        },
		changeSex: function(elem){
			var useme;
			if(typeof elem === "object"){
				useme = elem.currentTarget.id;
			}else{
				useme = elem;
			}
			Backbone.history.loadUrl(useme);
			window.location.href = '#'+useme;
		}
    });
    return HomeView;
});