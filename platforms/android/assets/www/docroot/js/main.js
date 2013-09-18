/*global require*/
'use strict';

//Because I am lazy I rebind console to c
var c = false;
if(typeof console === "object" && typeof console.error === "function"){
	c = function (msg){console.info(msg);};
}else{
	c =  function (msg){alert(msg);};
}

var SD = {}; //define SD so we can use it globally

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
		jStorage: {
			deps: ['jquery'],
			exports: '$.jStorage'
		}
    },
    paths: {
        jquery: '../../bower_components/jquery/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
		jStorage: 'collections/plugins/jStorage'
    }
});

//Start off the router
require([
    // Requires ----------------
    'backbone',
	'jStorage',

    // Routes ----------------
    'routes/router',

    // Views ----------------
    'views/HomeView',
    'views/LoginView',

    // functions ----------------
    'core.functions',
    'sd.functions'

], function () {
    //set arguments to values for ease of reading arguments
    var Backbone = arguments[0],
        Router = arguments[2],
        HomeView = arguments[3],
        LoginView = arguments[4],
        SD = arguments[6];

    // initiate routers ----------------
    var router = new Router();

    // views ---------------------------
    var homeView = new HomeView();
    var loginView = new LoginView();

	//Start home route
//	router.on('route:home', function(){
//		//if logged in logic
//		homeView.render();
//	});

	router.on('route:login', function(){
		if(sessionStorage.getItem('privateKey')!==null){
			homeView.render();
		}else{
			loginView.render();
		}
	});

	//set up the error codes meaning
	$.ajaxSetup({
		statusCode: {
			401: function(){
				// Redirec the to the login page.
				window.location.replace('/#login');

			},
			403: function() {
				// 403 -- Access denied
				window.location.replace('/#denied');
			},
			405: function(){
				// Redirec the to the login page.
				window.location.replace('/#methodwrong');

			}
		}
	});

    //start entire application
    Backbone.history.start();
});
