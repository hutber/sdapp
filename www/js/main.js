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
		},
		paths: {
			jquery: 'libs/jquery.min',
			backbone: 'libs/backbone-min',
			underscore: 'libs/underscore-min',
			jStorage: 'libs/plugins/jStorage',
			slider: 'libs/plugins/slider/jquery.royalslider',
			slidervisibleNearby: 'libs/plugins/slider/modules/jquery.rs.visible-nearby',
			sliderthumbnails: 'libs/plugins/slider/modules/jquery.rs.thumbnails',
			sliderCaption: 'libs/plugins/slider/modules/jquery.rs.global-caption',
			flowtype: 'libs/plugins/flowtype',
			mobiscroll: 'libs/plugins/date/mobiscroll.core',
			mobiscrollScroller: 'libs/plugins/date/mobiscroll.scroller',
			mobiscrollDate: 'libs/plugins/date/mobiscroll.datetime',
			forms: 'libs/plugins/hutber.forms',
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
// Plugins --------------------,
		'flowtype',
		'mobiscroll',
		'mobiscrollScroller',
		'mobiscrollDate',
], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[4],
		IndexView = arguments[7],
        HomeView = arguments[8],
        LoginView = arguments[9],
        ForgottenView = arguments[10],
		SignUpView = arguments[11],
		wankView = arguments[12],
        handsView = arguments[13],
        oralView = arguments[14],
        sexView = arguments[15],
        anythingView = arguments[16],
        whoView = arguments[17],
		whoAddView = arguments[18],
		whereView = arguments[19];

/*==================================================
Load in scripts depending on which device we are.
================================================== */
	if(SD.isMobile){
		$.getScript('phonegap.js', function( data, textStatus, jqxhr){
//			c( "cordova was loaded." );
			var s = document.createElement('script');
			s.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
			document.getElementsByTagName('body')[0].appendChild(s);
		});
	}else{
		$.getScript('http://localhost:35729/livereload.js');
	}


		/*==================================================
		Start up SD global object.
		================================================== */
	SD.init();

/*==================================================
Routes Vars
================================================== */
// initiate routers ----------------
    SD.ROUTER = new Router(),

// views ---------------------------
    SD.VIEWS.indexView = new IndexView(),
    SD.VIEWS.homeView = new HomeView(),
	SD.VIEWS.signUpView = new SignUpView(),
	SD.VIEWS.loginView = new LoginView(),
	SD.VIEWS.forgottenView = new ForgottenView(),

// Sex views ---------------------------
	SD.VIEWS.WankView = new wankView(),
	SD.VIEWS.HandsView = new handsView(),
	SD.VIEWS.OralView = new oralView(),
	SD.VIEWS.SexView = new sexView(),
	SD.VIEWS.AnythingView = new anythingView(),

// Sex Details views ---------------------------
	SD.VIEWS.WhoView = new whoView(),
	SD.VIEWS.WhoAddView = new whoAddView(),
	SD.VIEWS.WhereView = new whereView();

/*==================================================
Routes
================================================== */
//# Default router ----------------------------------------------------------------
	SD.ROUTER.on('route:index route:home', function(){
		if(sessionStorage.getItem('privateKey')!==null){
			SD.VIEWS.homeView.render();
		}else{
			SD.VIEWS.indexView.render();
		}
	});

// Not logged in Routers ---------------------------
	SD.ROUTER.on('route:login', function(){
		SD.VIEWS.loginView.render();
	});
	SD.ROUTER.on('route:forgotten', function(){
		SD.VIEWS.forgottenView.render();
	});
	SD.ROUTER.on('route:signup', function(){
		SD.VIEWS.signUpView.render();
	});

// Sex Routers ---------------------------
	SD.ROUTER.on('route:wank', function(){
		SD.VIEWS.WankView.render();
	});
	SD.ROUTER.on('route:hands', function(){
		SD.VIEWS.HandsView.render();
	});
	SD.ROUTER.on('route:oral', function(){
		SD.VIEWS.OralView.render();
	});
	SD.ROUTER.on('route:sex', function(){
		SD.VIEWS.SexView.render();
	});
	SD.ROUTER.on('route:anything', function(){
		SD.VIEWS.AnythingView.render();
	});

// Sex Details Routes ---------------------------
	SD.ROUTER.on('route:who', function(){
		SD.VIEWS.WhoView.render();
	});
	SD.ROUTER.on('route:whoadd', function(){
		SD.VIEWS.WhoAddView.render();
	});
	SD.ROUTER.on('route:where', function(){
		SD.VIEWS.WhereView.render();
	});

/*==================================================
Global Plugins
================================================== */
$('body').flowtype({
	minFont   : 18,
	maxFont   : 40,
	fontRatio : 20
});

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
