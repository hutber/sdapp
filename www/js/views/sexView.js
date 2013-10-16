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
		el: 'page',
        template: JST[
			'app/www/js/templates/sex.ejs'
		],
        render: function () {
			var myself = this;
			SD.templates.defaultSex = myself.template;
			myself.$el.html(myself.template);
        }
    });
	var thisView = new sexView();
	thisView.render();
    return sexView;
});