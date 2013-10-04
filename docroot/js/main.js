/*global require*/
'use strict';

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
		},
		sd: {
			exports: 'SD'
		},
		core: {
			deps: ['jquery']
		},
		JST: {
			deps: ['underscore'],
			exports: 'JST'
		},
		touchCarousel: {
			deps: ['jquery'],
			exports: 'jQuery.fn.touchCarousel'
		},
//		phonegap: {
//			deps: ['jquery'],
//			exports: 'phonegap'
//		}
    },
    paths: {
        jquery: '../../bower_components/jquery/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore',
		jStorage: 'libs/jStorage',
		touchCarousel: 'libs/jquery.touchcarousel-1.2',
		core: 'core.functions',
		sd : 'sd.functions',
		JST : 'templates',
//		phonegap: '../../phonegap'
    }
});

//Start off the router
require([
    // Requires ----------------
    'backbone',
	'jStorage',
//	'phonegap',

    // Routes ----------------
    'routes/router',

    // functions ----------------
    'core.functions',
    'sd.functions',

	// Views ----------------
	'views/homeView',
	'views/loginView',
	'views/sex/wank',
	'views/sex/fingers',
	'views/sex/oral',
	'views/sex/sex',
	'views/sex/anything'

], function () {
    //set arguments to values for ease of reading arguments
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[4],
        HomeView = arguments[5],
        LoginView = arguments[6],
		wankView = arguments[7],
        fingersView = arguments[8],
        oralView = arguments[9],
        sexView = arguments[10],
        anythingView = arguments[11];

	//Check to see if we are in the live app
	if(SD.isMobile){
		$.getScript('cordova.js', function() { alert('cordova Load was performed.'); });
	}else{
		$.getScript('http://localhost:35729/livereload.js');
	}

	SD.init(); //start SD
	SD.ARGS = arguments;

    // initiate routers ----------------
    var router = new Router();

    // views ---------------------------
    var homeView = new HomeView();
    var loginView = new LoginView();

	// Sex views ---------------------------
	var WankView = new wankView();
	var FingersView = new fingersView();
	var OralView = new oralView();
	var SexView = new sexView();
	var AnythingView = new anythingView();

	// Router ---------------------------
	router.on('route:login', function(){
		if(sessionStorage.getItem('privateKey')!==null){
			homeView.render();
		}else{
			loginView.render();
		}
	});

	// Sex Routers ---------------------------
	router.on('route:wank', function(){
		WankView.render();
	});
	router.on('route:fingers', function(){
		FingersView.render();
	});
	router.on('route:oral', function(){
		OralView.render();
	});
	router.on('route:sex', function(){
		SexView.render();
	});
	router.on('route:anything', function(){
		AnythingView.render();
	});

	if(SD.isMobile){
		document.addEventListener("deviceready", function(){
			Backbone.history.start();
		}, true);
	}else{
		$(document).ready(function() {
			Backbone.history.start();
		});
	}

	SD.centerItems($('content'));
});
