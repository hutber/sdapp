/*
==================================================
Table of Contents - Created by Hutber on 04/10/13.
==================================================
 #Require JS Config
 #Require Routes set up
 #Arguments
 #isMobile If
 #SD init
 #Route Vars
 #Routes
 #On Ready
 */

'use strict';
/*==================================================
 Require JS Config
==================================================*/
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
		date: {
			exports: 'date'
		},
		sd: {
			exports: 'SD'
		},
		JST: {
			deps: ['underscore'],
			exports: 'JST'
		},
		//Carousel items
		slider: {
			deps: ['jquery'],
			exports: 'jQuery.fn.touchCarousel'
		},
		slidervisibleNearby: {
			deps: ['slider'],
			exports: 'jQuery.fn.visibleNearby'
		},
		sliderthumbnails: {
			deps: ['slider'],
			exports: 'jQuery.fn.thumbnails'
		},
		sliderCaption: {
			deps: ['slider'],
			exports: 'jQuery.fn.global-caption'
		},
		flowtype: {
			deps: ['jquery'],
			exports: 'jQuery.fn.flowtype'
		},
		mobiscroll: {
			deps: ['jquery'],
			exports: 'jQuery.fn.mobiscroll'
		},
		mobiscrollScroller: {
			deps: ['jquery','mobiscroll']
		},
		mobiscrollDate: {
			deps: ['jquery','mobiscrollScroller']
		},
		forms: {
			deps: ['jquery']
		},
		highcharts : {
			deps: ['jquery'],
			exports: 'highcharts'
		}
	},
	paths: {
		jquery: 'libs/jquery.min',
		backbone: 'libs/backbone-min',
		underscore: 'libs/underscore-min',
		slider: 'libs/plugins/jquery.royalslider',
		flowtype: 'libs/plugins/flowtype',
		fastclick: 'libs/plugins/FastClick',
		mobiscroll: 'libs/plugins/date/mobiscroll.core',
		mobiscrollScroller: 'libs/plugins/date/mobiscroll.scroller',
		mobiscrollDate: 'libs/plugins/date/mobiscroll.datetime',
		forms: 'libs/plugins/hutber.forms',
		highcharts: 'libs/plugins/highcharts',
		date: 'libs/plugins/date',
		core: 'core.functions',
		sd : 'sd.functions',
		dv : 'views/defaultView',
		dsv : 'views/defaultSexView',
		JST : 'templates'
	}
});

/*==================================================
Routers
==================================================*/
// Requires ----------------
require([
		'backbone',
// Routes ----------------
		'routes/router',
// functions ----------------
		'sd',
		'dv',
		'dsv',
// Views ----------------
		'views/indexView',
		'views/homeView',
		'views/loginView',
		'views/forgottenView',
		'views/signUpView',
		'views/sex/wank',
		'views/sex/hands',
		'views/sex/oral',
		'views/sex/sex',
		'views/sex/anything',
// Sex Details Pages --------------------,
		'views/details/who',
		'views/details/whoAdd',
		'views/details/where',
// User Pages --------------------,
		'views/users/profile',
		'views/users/history',
		'views/users/managewhos',
		'views/users/settings',
		'views/users/calendar',
// Plugins --------------------,
		'views/other/shop',
		'views/other/privacy',
// Plugins --------------------,
		'fastclick',
		'flowtype',
], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[1],
		SD = arguments[2],
		IndexView = arguments[5],
        HomeView = arguments[6];

/*==================================================
 Start up SD global object.
 ================================================== */
SD.init();

/*==================================================
Routes Vars
================================================== */
// initiate routers ----------------
    SD.ROUTER = new Router();

//// views ---------------------------
    SD.VIEWS.indexView = new IndexView();
    SD.VIEWS.homeView = new HomeView();

/*==================================================
Routes
================================================== */
	var names = [];
		names[7] = 'login';
		names[8] = 'forgotten';
		names[9] = 'signup';
		names[10] = 'wank';
		names[11] = 'hands';
		names[12] = 'oral';
		names[13] = 'sex';
		names[14] = 'anything';
		names[15] = 'who';
		names[16] = 'whoadd';
		names[17] = 'where';
		names[18] = 'profile';
		names[19] = 'history';
		names[20] = 'managewhos';
		names[21] = 'settings';
		names[22] = 'calendar';
		names[23] = 'shop';
		names[24] = 'privacy';
	var myArgs = arguments;

	names.forEach(function(me, key){
		var functionName = me+"View";
		SD.VIEWS[functionName] = new myArgs[key]();
		SD.ROUTER.on('route:'+me, function(){
			SD.VIEWS[functionName].render(); // succeeds
		});
	});

//# Default router ----------------------------------------------------------------
		SD.ROUTER.on('route:index route:home', function(){
			if(localStorage.getItem('privateKey')!==null){
				SD.VIEWS.homeView.render();
			}else{
				SD.VIEWS.indexView.render();
			}
		});

/*==================================================
Global Plugins
================================================== */
//$('body').flowtype({
//	minFont   : 18,
//	maxFont   : 30,
//	fontRatio : 20
//});

/*==================================================
On Device Ready
================================================== */
	if(SD.isMobile){
		document.addEventListener("deviceready", function(){
			Backbone.history.start();
			SD.checkConnection();
		}, true);
	}else{
		$(document).ready(function() {
			window.scrollTo(0, 1);
			Backbone.history.start();
		});
	}
});
