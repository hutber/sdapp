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
			}
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
			core: 'core.functions',
			sd : 'sd.functions',
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
// Views ----------------
		'views/indexView',
		'views/homeView',
		'views/loginView',
		'views/signUpView',
		'views/sex/wank',
		'views/sex/hands',
		'views/sex/oral',
		'views/sex/sex',
		'views/sex/anything',
// Plugins --------------------,
		'flowtype',
], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[4],
		IndexView = arguments[5],
        HomeView = arguments[6],
        LoginView = arguments[7],
		SignUpView = arguments[8],
		wankView = arguments[9],
        handsView = arguments[10],
        oralView = arguments[11],
        sexView = arguments[12],
        anythingView = arguments[13];

/*==================================================
Load in scripts depending on which device we are.
================================================== */
	if(SD.isMobile){
		$.getScript('phonegap.js', function( data, textStatus, jqxhr){
			c( "cordova was loaded." );
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

// Sex views ---------------------------
	SD.VIEWS.WankView = new wankView(),
	SD.VIEWS.HandsView = new handsView(),
	SD.VIEWS.OralView = new oralView(),
	SD.VIEWS.SexView = new sexView(),
	SD.VIEWS.AnythingView = new anythingView();

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
			Backbone.history.start();
		});
	}
});
