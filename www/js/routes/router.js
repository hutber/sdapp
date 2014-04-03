/*global define*/
define([
    'jquery',
    'backbone',
    'sd'
], function ($, Backbone, SD) {
    'use strict';

	//routes from the home page
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
			'selector': 'index',
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
			'setpin' : 'setpin',
			'confirmpin' : 'confirmpin',
			'pinsave' : 'pinsave',
			'pin' : 'pin',
			'profile': 'profile',
			'userhistory': 'userhistory',
			'managewhos': 'managewhos',
			'settings': 'settings',
			'calendar': 'calendar',

			//Other
			'shop' : 'shop',
			'privacy' : 'privacy',
        }
    });

    return Router;
});