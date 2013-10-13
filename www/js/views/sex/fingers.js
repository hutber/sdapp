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
        template: JST['app/www/js/templates/sex/fingers.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return fingers;
});