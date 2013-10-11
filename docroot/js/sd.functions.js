/*
 ==================================================
 Table of Contents - Created by Hutber on 13/09/13.
 ==================================================
 #Definitions from require
 #Globals
 #Routes/Views
 #Display functions
 #Networking functions
 */
define([
	'jquery',
	'backbone',
	'JST'
], function ($, Backbone, JST) {
//	'use strict';

/*==================================================
Globals
================================================== */

// #Globals for SD ------------------------------------------------------
	SD = {
		isMobile: SD.isMobile,
		ENVIROMENT: 'liveApp',
		CDN: 'stage.sexdiaries.co.uk/',
		HTTP: 'http://stage.sexdiaries.co.uk/',
		STATE: function(){
			if(sessionStorage.getItem('privateKey')!==null){
				$('body').addClass('loggin');
				return true;
			}else{
				return false;
			}
		}()
	};

// #define the globals depending on where we are ------------------------------------------------------
	SD.globals = function () {
		switch (window.location.hostname) {
			case "sd.local":
				SD.ENVIROMENT = 'localApp',
					SD.CDN = 'sd.local/',
					SD.HTTP = 'http://sexdiaires.local/',
					SD.AJAX = SD.HTTP+'app/';
				break;
			case "192.168.0.25":
				SD.ENVIROMENT = 'mobilePhone',
					SD.AJAX = SD.HTTP+ 'app/';
				break;
			default:
				SD.AJAX = SD.HTTP+'app/';
				break;
		}
	};

/*==================================================
Routes/Views
================================================== */
// #Set up the Deult router view ------------------------------------------------------
	SD.defaultView = function(){ //Default controller for all views
		var templatesNeeded = function () {
			var myself;
			if (SD.STATE) {
				myself = {
					header: JST['platforms/android/assets/www/docroot/js/templates/comp/headerIn.ejs'],
					menu: JST['platforms/android/assets/www/docroot/js/templates/comp/menu.ejs'],
					shell: JST['platforms/android/assets/www/docroot/js/templates/comp/shell.ejs'],
					footer: JST['platforms/android/assets/www/docroot/js/templates/comp/footer.ejs'],
				};
				SD.templates = myself;
				myself = myself.header() + myself.menu() + myself.shell() + myself.footer();
			} else {
				myself = {
					header: JST['platforms/android/assets/www/docroot/js/templates/comp/headerOut.ejs'],
					menu: JST['platforms/android/assets/www/docroot/js/templates/comp/menu.ejs'],
					shell: JST['platforms/android/assets/www/docroot/js/templates/comp/shell.ejs'],
					footer: JST['platforms/android/assets/www/docroot/js/templates/comp/footer.ejs'],
				};
				SD.templates = myself;
				myself = myself.header() + myself.menu() + myself.shell() + myself.footer();
			}
			return myself;
		}();
		var HomeView = Backbone.View.extend({
			el: 'body > content',
			render: function () {
				this.$el.html(templatesNeeded);
			}
		});
		var defaultView = new HomeView();
		defaultView.render();
		return HomeView;
	}();

/*==================================================
Display functions
================================================== */
// #Will center the view ------------------------------------------------------
	SD.centerItems = function (eleme) {
		var appHeight = $(document).outerHeight(),
			bodyHeight = eleme.outerHeight(),
			middleHeight = (appHeight / 2) - (bodyHeight / 2);

		eleme.css({top: middleHeight, position: 'absolute'});

		$(window).resize(function(){
			SD.centerItems($('content')); //center the items in the middle of the page
		});
	};

// #display the popup/overlay ------------------------------------------------------
	SD.overlay = {
		init: function(elem) {
			SD.centerItems(elem);
		},
		showme: function(){
			$('overlay').fadeIn();
		},
		hideme: function(){
			$('overlay').fadeOut('fast');
		}
	};

/*==================================================
Networking functions
================================================== */
	SD.checkConnection = function () {
		var networkState = navigator.connection.type;

		var states = {};
		if(typeof Connection!=="undefined"){
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';

			c('Connection type: ' + states[networkState]);
		}else{
			c('Connection not ready yet');
		}
	};


// #Init for SD ------------------------------------------------------
	SD.init = function () {
		SD.globals(); //set up our global variables
	};

//return SD
	return SD;
});
