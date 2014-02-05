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
			if(sessionStorage.getItem('privateKey')===null){
				return false;
			}else{
				$('body').data('state','loggedin');
				return true;
			}
		}(),
		CURRENTSEX: 'na',
		SEXDETAILS: {
			datetime:''
		},
		SEXDEFAULTS: {
			url: SD.HTTP+'stats/add',
			sextype: 'default',
			image: '/img/path.jpg',
		},
		WHO: null,
		TEMPLATE: 'footerout',
		HASH:'',
		SLIDER: null,
		VIEWS: {},
		ROUTER: false,
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
Login functions
================================================== */
SD.login = {
	checkLoginState : function(state) { //We use this state to enable us to use the function on every page load to check if the user is logged in
		if(sessionStorage.getItem('privateKey')===null && typeof state !== "undefined"){ //Not logged in, force to home
			document.location.replace('');
			location.reload();
		}else if (state){ //This state is only ever set when loggin in: loginView.js:62 //If logged in force to sex picker
			window.location.href = "#home";
			location.reload();
		}
	}
};

/*==================================================
Routes/Views
================================================== */
	SD.onHashChange = function(){
		//Update the new hash
		SD.HASH = window.location.hash.substring(1);

		//Update the current sex state with whatever is in the hash
//		SD.CURRENTSEX = SD.HASH;

		//On page load update body class with current page
		SD.DV.globalClass();

		//Add new class to body
//		$('body').removeAttr('class').addClass(SD.HASH); //Update class on body
	};

/*==================================================
Display functions
================================================== */
//	#Update title
	SD.setTitle = function(title){
		$('.title').html(title);
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

	//update details on page load
	SD.pageLoad = function(pageToLoad){
		var useme;

		//Simple check if we have been given a string
		if(typeof pageToLoad === "string"){
			useme = pageToLoad;
		}else if(document.location.hash){
			useme = SD.HASH;
		}else{
			c('Nothing was given in the pageLoad');
		}

		if(!$('sexdetails').length){
			//If the sex details page isn't in view load it up
			//So that we can then load the sex details page
			SD.DSV.render();
		}

		//update current sex
//		SD.CURRENTSEX = useme;
		SD.ROUTER.navigate(useme, true);

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
		SD.onHashChange();
		window.addEventListener("hashchange", SD.onHashChange, false);

		//Remove debugs if they are there
		$('debug').on('click', 'li:first', function(){
			$('debug li').remove();
		});
	};

//return SD
	return SD;
});
