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
            '': 'index',
			'login': 'login',
			'forgotten': 'forgotten',
			'signup': 'signup',
			'home': 'home',
			'wank': 'wank',
			'hands': 'hands',
			'oral': 'oral',
			'sex': 'sex',
			'anything': 'anything',

			//Details
			'who': 'who',
			'whoadd': 'whoadd',
			'where': 'where',
			'whereadd': 'whereadd',

			//Users
			'profile': 'profile',
			'previous': 'previous',
			'managewhos': 'managewhos',
			'settings': 'settings',

			//Other
			'shop' : 'shop',
			'privacy' : 'privacy',
        }
    });

    return Router;
});