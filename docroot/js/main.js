/*global require*/
'use strict';
alert('running');
//Because I am lazy I rebind console to c
var c = false; if(typeof console === "object" && typeof console.error === "function"){ c = function (msg){console.info(msg);}; }else{ c =  function (msg){alert(msg);};}
window.isphone = false; if(document.URL.indexOf("local") > 0 || document.URL.indexOf("sex") > 0) {	window.isphone = true;}
//var SD = {}; //define SD so we can use it globally
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
			deps: ['jquery'],
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

	//Check to see if we are in the live app
	if(!window.isphone){
		$.getScript('cordova.js', function() { alert('Load was performed.'); });
	}

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
//			SD.checkConnection();
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
	document.addEventListener("deviceready", Backbone.history.start, false);

	$(document).ready(function() {
		//start entire application
		Backbone.history.start();
	});

	SD.centerItems($('content'));
});
