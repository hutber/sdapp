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
		sd: {
			exports: 'SD'
		},
		dv: {
			deps: ['sd']
		},
		JST: {
			deps: ['underscore'],
			exports: 'JST'
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
		'modernizr',
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
		'views/whos/who',
		'views/whos/whoAdd',
		'views/details/where',
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

], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[3],
		IndexView = arguments[6],
        HomeView = arguments[7];

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
		names[8] = 'login';
		names[9] = 'forgotten';
		names[10] = 'signup';
		names[11] = 'wank';
		names[12] = 'hands';
		names[13] = 'oral';
		names[14] = 'sex';
		names[15] = 'anything';
		names[16] = 'who';
		names[17] = 'whoadd';
		names[18] = 'where';
		names[19] = 'overview';
		names[20] = 'graphs';
		names[21] = 'userhistory';
		names[22] = 'managewhos';
		names[23] = 'settings';
		names[24] = 'calendar';
		names[25] = 'shop';
		names[26] = 'privacy';
		names[27] = 'setpin';
		names[28] = 'confirmpin';
		names[29] = 'pinsave';
		names[30] = 'pin';
		names[31] = 'terms';
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
