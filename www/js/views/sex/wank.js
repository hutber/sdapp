define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../../sd.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var wank = SD.defaultView.extend({
        el: 'page',

        template: JST['app/www/js/templates/sex/wank.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return wank;
});