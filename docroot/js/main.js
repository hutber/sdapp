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
			touchCarousel: {
				deps: ['jquery'],
				exports: 'jQuery.fn.touchCarousel'
			}
		},
		paths: {
			jquery: '../../bower_components/jquery/jquery',
			backbone: '../../bower_components/backbone/backbone',
			underscore: '../../bower_components/underscore/underscore',
			jStorage: 'libs/jStorage',
			touchCarousel: 'libs/jquery.touchcarousel-1.2',
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
		'views/sex/fingers',
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
        fingersView = arguments[8],
        oralView = arguments[9],
        sexView = arguments[10],
        anythingView = arguments[11];

/*==================================================
Load in scripts depending on which device we are.
================================================== */
	if(SD.isMobile){
		$.getScript('phonegap.js', function( data, textStatus, jqxhr){
			c( "cordova was loaded." );
		});
//		$.ajax({
//			url: "http://debug.build.phonegap.com/target/target-script-min.js#hutber",
//			dataType: "script",
//			error: function(data){
//				c('debug: '+ data.status);
//			},
//			success: function(data){
//				c('debug: '+ data);
//			}
//		});
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

/*==================================================
Routes
================================================== */
//# Default router ----------------------------------------------------------------
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

/*==================================================
On Device Ready
================================================== */
	if(SD.isMobile){
		document.addEventListener("deviceready", function(){
			Backbone.history.start();
			SD.checkConnection();
			c(SD.AJAX+'users/login');
			var s = document.createElement('script');
			s.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
			s.setAttribute("id","hutber");
			document.getElementsByTagName('body')[0].appendChild(s);
			c('hutber elm: '+$('#hutber')[0].outerHTML);
		}, true);
	}else{
		$(document).ready(function() {
			Backbone.history.start();
		});
	}

	SD.centerItems($('content'));
});
