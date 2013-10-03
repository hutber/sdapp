define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../../sd.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var fingers = SD.defaultView.extend({
		el: 'page',
        template: JST['platforms/android/assets/www/docroot/js/templates/sex/fingers.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return fingers;
});