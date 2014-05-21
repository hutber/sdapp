/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dv'
], function ($, _, Backbone, JST) {
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