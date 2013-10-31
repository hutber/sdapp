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
			bigtext: {
				deps: ['jquery'],
				exports: 'jQuery.fn.bigtext'
			},
			touchCarousel: {
				deps: ['jquery'],
				exports: 'jQuery.fn.touchCarousel'
			}
		},
		paths: {
			jquery: 'libs/jquery.min',
			backbone: 'libs/backbone-min',
			underscore: 'libs/underscore-min',
			jStorage: 'libs/plugins/jStorage',
			touchCarousel: 'libs/plugins/jquery.touchcarousel-1.2',
			bigtext: 'libs/plugins/bigtext.jquery',
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
		'views/homeView',
		'views/loginView',
		'views/sex/wank',
		'views/sex/hands',
		'views/sex/oral',
		'views/sex/sex',
		'views/sex/anything'
], function () {
/*==================================================
set arguments to values for ease of reading arguments
================================================== */
    var Backbone = arguments[0],
        Router = arguments[2],
		SD = arguments[4],
        HomeView = arguments[5],
        LoginView = arguments[6],
		wankView = arguments[7],
        handsView = arguments[8],
        oralView = arguments[9],
        sexView = arguments[10],
        anythingView = arguments[11];

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
    SD.VIEWS.homeView = new HomeView(),
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
	SD.ROUTER.on('route:login route:home', function(){
		if(sessionStorage.getItem('privateKey')!==null){
			SD.VIEWS.homeView.render();
		}else{
			SD.VIEWS.loginView.render();
		}
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
On Device Ready
================================================== */
	if(SD.isMobile){
		document.addEventListener("deviceready", function(){
			c('device ready');
			Backbone.history.start();
			SD.checkConnection();
		}, true);
	}else{
		$(document).ready(function() {
			Backbone.history.start();
		});
	};
});
