/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd.functions',
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var IndexView = SD.defaultView.extend({
		el: 'page',
        template: JST['app/www/js/templates/index.ejs'],
        render: function () {
            this.$el.html(this.template);
        }
    });
    return IndexView;
});