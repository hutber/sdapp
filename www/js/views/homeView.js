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
		thumbWidthGen: function(){
			var neededWidth = 0;
			$('.rsNavItem').each(function(){
				neededWidth += parseFloat($(this).outerWidth());
			});
			var widthNeeded = neededWidth+42;

			$('.rsThumbsHor').css({
				width: widthNeeded,
			});
		},
        render: function () {
			var myself = this;
			SD.templates.home = myself.template;
			SD.setTitle('SELECT SOME SEXYNESS');
			myself.$el.html(myself.template);

			var si = $('.royalSlider').royalSlider({ //Set up slider
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
			si.ev.on('rsSlideClick', function() { //Add click events to the sex icons
				SD.pageLoad($('.rsGCaption').find('anchor').attr('id'));
			});
			this.thumbWidthGen();
//			$(window).resize(function(){
//				myself.thumbWidthGen();
//			});
        },
		changeSex: function(elem){
			SD.pageLoad(elem);
		}
    });
    return HomeView;
});