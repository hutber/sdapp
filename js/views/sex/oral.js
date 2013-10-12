define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../../sd.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var oral = SD.defaultView.extend({
		el: 'page',
        template: JST['app/www/js/templates/sex/oral.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return oral;
});