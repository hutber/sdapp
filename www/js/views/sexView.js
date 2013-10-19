define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'core.functions',
	'sd.functions',
	'touchCarousel'
], function ($, _, Backbone, JST, core, SD) {
    'use strict';

	//set up homeview
    var sexView = SD.defaultView.extend({
		events:{
			"click sexoptions > *" : 'changeSex'
		},
		changeSex: function(elem){
			SD.pageLoad(elem);
		}
    });
    return sexView;
});