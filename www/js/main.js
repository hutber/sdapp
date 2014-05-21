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
	waitSeconds: 200,
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
		sf: {
			exports: 'SD'
		},
		ss: {
			deps: ['sf']
		},
		sl: {
			deps: ['ss']
		},
		sloc: {
			deps: ['sl']
		},
		sd: {
			deps: ['sloc']
		},
		dv: {
			deps: ['sd']
		},
		JST: {
			deps: ['underscore'],
			exports: 'JST'
		},
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
		},
	},
	paths: {
		jquery: 'libs/jquery.min',
		backbone: 'libs/backbone-min',
		underscore: 'libs/underscore-min',
		modernizr: 'libs/modernizr-dev',
		slider: 'libs/plugins/jquery.royalslider',
		flowtype: 'libs/plugins/flowtype',
		fastclick: 'libs/plugins/FastClick',
		mobiscroll: 'libs/plugins/date/mobiscroll.core',
		mobiscrollScroller: 'libs/plugins/date/mobiscroll.scroller',
		mobiscrollDate: 'libs/plugins/date/mobiscroll.datetime',
		forms: 'libs/plugins/hutber.forms',
		highcharts: 'libs/plugins/highcharts',
		hammer: 'libs/plugins/hammer/hammer.min',
//		jqueryhammer:'libs/plugins/hammer/jquery.hammer.min',
//		backbonehammer:'libs/plugins/hammer/backbone.hammer',
		date: 'libs/plugins/date',
		core: 'core.functions',
		sd : 'functions/sd.functions',
		sf : 'functions/sd.functions.sex',
		sl : 'functions/sd.functions.login',
		ss : 'functions/sd.functions.selection',
		sloc : 'functions/sd.functions.location',
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
		'modernizr',
// Routes ----------------
		'routes/router',
// functions ----------------
		'sf',
		'ss',
		'sl',
		'sloc',
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
		'views/whos/who',
		'views/whos/whoAdd',
		'views/place/place',
// Stats --------------------,
		'views/stats/overview',
		'views/stats/graphs',
// User Pages --------------------,
		'views/users/userhistory',
		'views/whos/managewhos',
		'views/users/settings',
		'views/users/calendar',
// Other Pages --------------------,
		'views/other/shop',
		'views/other/privacy',
		'views/users/setpin',
		'views/users/confirmpin',
		'views/users/pinsave',
		'views/users/pin',
		'views/other/terms',
		'views/diary/diary',

// Positions -----------------------
		'views/positions/positions'

], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[6],
		IndexView = arguments[10],
        HomeView = arguments[11];

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
		names[12] = 'login';
		names[13] = 'forgotten';
		names[14] = 'signup';
		names[15] = 'wank';
		names[16] = 'hands';
		names[17] = 'oral';
		names[18] = 'sex';
		names[19] = 'anything';
		names[20] = 'who';
		names[21] = 'whoadd';
		names[22] = 'place';
		names[23] = 'overview';
		names[24] = 'graphs';
		names[25] = 'userhistory';
		names[26] = 'managewhos';
		names[27] = 'settings';
		names[28] = 'calendar';
		names[29] = 'shop';
		names[30] = 'privacy';
		names[31] = 'setpin';
		names[32] = 'confirmpin';
		names[33] = 'pinsave';
		names[34] = 'pin';
		names[35] = 'terms';
		names[36] = 'diary';
		names[37] = 'positions';
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
