/*global define*/
define([
    'jquery',
    'backbone',
    'sd.functions'

], function ($, Backbone, SD) {
    'use strict';

	//routes from the home page
    var Router = Backbone.Router.extend({
        routes: {
            '': 'login',
			'login': 'login'
        }
    });

    return Router;
});