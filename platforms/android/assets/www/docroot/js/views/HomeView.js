/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../dist/js/templates',
	'../core.functions',
	'../sd.functions'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        el: 'page',

        template: JST['platforms/android/assets/www/docroot/js/templates/home.ejs'],

        render: function () {
            this.$el.html(this.template);
        },

        events: {
            'submit .loginForm ': 'logUserIn'
        },

        logUserIn: function (elem) {

        }
    });
    return HomeView;
});