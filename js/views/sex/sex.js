define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../../sd.functions'
], function ($, _, Backbone, JS, SD) {
    'use strict';

	//set up homeview
    var sex = SD.defaultView.extend({
		el: 'page',
        template: JST['app/www/js/templates/sex/sex.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return sex;
});