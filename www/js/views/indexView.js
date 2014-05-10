/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd',
	'dv'
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var IndexView = SD.defaultView.extend({
		el: 'page',
        template: JST['templates/index.ejs'],
        render: function () {
            this.$el.html(this.template);
        }
    });
    return IndexView;
});