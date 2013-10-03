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
        template: JST['platforms/android/assets/www/docroot/js/templates/sex/sex.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return sex;
});