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
			jStorage: {
				deps: ['jquery'],
				exports: '$.jStorage'
			},
			date: {
				exports: 'date'
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
			jStorage: 'libs/plugins/jStorage',
			slider: 'libs/plugins/jquery.royalslider',
			flowtype: 'libs/plugins/flowtype',
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
		'jStorage',
// Routes ----------------
		'routes/router',
// functions ----------------
		'core.functions',
		'sd.functions',
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
		'views/users/previous',
		'views/users/managewhos',
		'views/users/settings',
// Plugins --------------------,
		'views/other/shop',
		'views/other/privacy',
// Plugins --------------------,
		'flowtype',
		'date'
], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[4],
		IndexView = arguments[7],
        HomeView = arguments[8];

/*==================================================
 Start up SD global object.
 ================================================== */
SD.init();

/*==================================================
Routes Vars
================================================== */
// initiate routers ----------------
    SD.ROUTER = new Router(),

//// views ---------------------------
    SD.VIEWS.indexView = new IndexView(),
    SD.VIEWS.homeView = new HomeView();

/*==================================================
Routes
================================================== */
	var names = [];
		names[9] = 'login';
		names[10] = 'forgotten';
		names[11] = 'signup';
		names[12] = 'wank';
		names[13] = 'hands';
		names[14] = 'oral';
		names[15] = 'sex';
		names[16] = 'anything';
		names[17] = 'who';
		names[18] = 'whoadd';
		names[19] = 'where';
		names[20] = 'profile';
		names[21] = 'previous';
		names[22] = 'managewhos';
		names[23] = 'settings';
		names[24] = 'shop';
		names[25] = 'privacy';
	var myArgs = arguments;

	names.forEach(function(me, key){
		var functionName = me+"View";
		SD.VIEWS[functionName] = new myArgs[key]();
		SD.ROUTER.on('route:'+me, function(){
			SD.VIEWS[functionName]["render"](); // succeeds
		});
	});

//# Default router ----------------------------------------------------------------
		SD.ROUTER.on('route:index route:home', function(){
			if(sessionStorage.getItem('privateKey')!==null){
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
