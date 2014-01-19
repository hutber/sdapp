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
		VIEWS: {},
		ROUTER: false
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
//			SD.defaultView.render();
//			SD.ROUTER.navigate('');
		}else if (state){ //This state is only ever set when loggin in: loginView.js:62 //If logged in force to sex picker
			window.location.href = "#home";
			location.reload();
//			SD.DSV.render();
//			SD.VIEWS.homeView.render();
//			SD.ROUTER.navigate('home');
		}
	}
};

/*==================================================
Routes/Views
================================================== */
// #Set up the Deult router view ------------------------------------------------------
	SD.defaultView = function(){ //Default controller for all views
		var templatesNeeded = function () { //create a var of the template view
			var myself;
			if (SD.STATE) { //Chhek if we are logged in or not then give different templates
				myself = {
					header: JST['app/www/js/templates/comp/headerIn.ejs'],
					menu: JST['app/www/js/templates/comp/menu.ejs'],
					shell: JST['app/www/js/templates/comp/shell.ejs'],
					footer: JST['app/www/js/templates/comp/footerIn.ejs'],
				};
			} else {
				myself = {
					header: JST['app/www/js/templates/comp/headerOut.ejs'],
					menu: JST['app/www/js/templates/comp/menu.ejs'],
					shell: JST['app/www/js/templates/comp/shell.ejs'],
					footer: JST['app/www/js/templates/comp/footerOut.ejs'],
				};

			}
			SD.templates = myself;
			return myself.header() + myself.menu() + myself.shell() + myself.footer();
		}();

		//extend the view with the default home view
		var HomeView = Backbone.View.extend({
			el: 'body > content',
			events: { //Add click events for global clicks
				'click .logout': 'doLogOut',
				'click logo a': 'goHome',
				'click a, sexoptions > *': 'globalClass',
			},
			render: function () {
				SD.login.checkLoginState();
				this.$el.html(templatesNeeded);
			},
			doLogOut: function(){
				sessionStorage.clear();
				document.location.replace('/');
				return false;
			},
			goHome: function(){
				SD.ROUTER.navigate('home', true);
				return false;
			},
			globalClass: function(m){
				var desireClass = function(){if(m.currentTarget.nodeName === "A"){
						return m.currentTarget.hash.substring(1);
					}else{
						return m.currentTarget.nodeName;
					}
				};
				$('body').removeAttr('class').addClass(desireClass);
			}
		});
		var defaultView = new HomeView();
		defaultView.render();
		return HomeView;
	}();

	SD.defaultSexView = function(){
		//set up homeview
		var sexView = SD.defaultView.extend({
			el: 'page',
			jstemplate: JST['app/www/js/templates/sex/sexTemplate.ejs'],
			ownView: JST['app/www/js/templates/sex.ejs'],
			events:{
				"click sexoptions > *" : 'changeSex',
				"click sexform items > *" : 'openASex',
			},
			changeSex: function(elem){
				var me = elem.currentTarget.localName;
				SD.updateSexClass(me); // #update body classes with new sex class

				$('.selected').removeClass('selected');// #update selected from bottom navigation
				$(me).addClass('selected');

				SD.CURRENTSEX = elem; //update the state
				SD.pageLoad(elem);
			},
			openASex: function(el){

			},
			render: function () { //the global render
				useme = document.location.hash.replace('#','');
				if(useme.length===0){
					$('body').removeAttr('class').addClass('login');
				}else {
					$('body').removeAttr('class').addClass(useme);
				}
				var compiled = this.jstemplate();
				this.$el.html(compiled);
			},
			renderSex: function (view){
				$('sexdetails').html(view);

			}
		});

		SD.DSV = new sexView();
		SD.DSV.render();
		return sexView;
	}();

/*==================================================
Display functions
================================================== */
//	#Update title
	SD.setTitle = function(title){
		$('.title').html(title);
	};

//	#Remove Classes
	SD.updateSexClass = function(sex){
		var bodydom = $('body');
//		if(bodydom.hasClass('loggin')){bodydom.attr('class','loggin');}
		bodydom.toggleClass(sex);
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
	SD.pageLoad = function(elem){
		var useme;

		if(typeof elem === "object" && elem.currentTarget.id){
			useme = elem.currentTarget.id;
		}else if(typeof elem === "object"){
			useme = elem.currentTarget.localName;
		}else if(elem){
			useme = elem;
		}else if(document.location.hash){
			useme = document.location.hash.replace('#','');
		}else{
			useme = elem;
		}

		if(!$('sexdetails').length){
			SD.DSV.render();
		}

		SD.CURRENTSEX = useme; //update the state
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
	};

//return SD
	return SD;
});
