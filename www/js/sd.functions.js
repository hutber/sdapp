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
		SEXDEFAULTS: {
			sextype: 'default',
			sexnumber: 0,
			image: '/img/path.jpg',
			sextime:[false,false],
			who: {},
			rating: 0,
			location: [false, 'Click to get your location'],
			where: {},
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
					SD.AJAX = SD.HTTP+'app/',
					SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';
				break;
			case "192.168.0.25":
					SD.ENVIROMENT = 'mobilePhone',
					SD.AJAX = SD.HTTP+ 'app/',
					SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';
				break;
			default:
					SD.AJAX = SD.HTTP+'app/',
					SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';
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

SD.changeHeightofContent = function(){
	SD.pageHeight = $('body').outerHeight() - ($('header').outerHeight() + $('footer').outerHeight());
	$('page').css({height:SD.pageHeight});
};

SD.onHashChange = function(){
	//Update the new hash
	SD.HASH = window.location.hash.substring(1);

	//Update the current sex state with whatever is in the hash
//		SD.CURRENTSEX = SD.HASH;

	//On page load update body class with current page
	SD.DV.globalClass();

	SD.changeHeightofContent();

	//Add new class to body
//		$('body').removeAttr('class').addClass(SD.HASH); //Update class on body
};

/*==================================================
Add Sex Functions
================================================== */
SD.addSex = {
	convertPhp: function(){
		var php = {};

		php.sexnumber = SD.SEXDEFAULTS.sexnumber,
		php.sextime = $.scroller.formatDate('yy-mm-dd HH:ii:ss', SD.SEXDEFAULTS.sextime[0].getDate()),
		php.rating = SD.SEXDEFAULTS.rating;

		if(SD.SEXDEFAULTS.location[0]!==false){
			//Location Generator
			for	(var index in SD.SEXDEFAULTS.location[0].address) {
				php['location'+index] = SD.SEXDEFAULTS.location[0].address[index];
			}
			php.locationlat = SD.SEXDEFAULTS.location[0].lat,
			php.locationlon = SD.SEXDEFAULTS.location[0].lon;
		}

		if(Object.keys(SD.SEXDEFAULTS.who).length>0){
			php.who = SD.SEXDEFAULTS.who;
		}
		if(Object.keys(SD.SEXDEFAULTS.where).length>0){
			php.where = SD.SEXDEFAULTS.where;
		}

		return php;
	},
	save: function(){
		if(sessionStorage.privateKey){
			$.ajax({
				url: SD.AJAX+'add',
				type: 'POST',
				data: {
					info: SD.addSex.convertPhp(),
					privateKey: sessionStorage.privateKey
				},
				error: function(data){
					c('Sorry Login Failed: '+data.status);
					SD.message.showMessage('Sorry Login Failed: '+data.status, 'bad');
				},
				success: function(data){
					if(data.length===2){
						SD.message.showMessage('Entry has been added and all stats updated, fuck ye man...', null, 2500);
					}else{
						SD.message.showMessage('Something went wrong whilst adding the entry. Ek ermm... check if its there maybe?', 'bad', 6000);
					}
				}
			});
		}else{
			SD.message.showMessage('You appear to not be logged in?', 'bad');
		}
	}
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

		//TODO review code - Why did we need this?
		if(!$('sexdetails').length){
			//If the sex details page isn't in view load it up
			//So that we can then load the sex details page
//			SD.DSV.render();
		}

		//update current sex
		//SD.CURRENTSEX = useme; //Removed as this was causing double loads, we are already rendering by using on:wank for example,
		// this was nessesery we we had two renders for sex

		//Update the current view, don't re-redner it
		SD.ROUTER.navigate(useme, true);
	};

	SD.message = {
		timer: null,
		showMessage: function(message, type, duration){
			if(typeof duration === "undefined") duration = 5000;
			$('messageBox').removeAttr('class').addClass(type).show().css("display","block");
			$('messageBox message').fadeIn().find('div').html(message);
			this.timer = setTimeout(this.hideMessage, duration);
		},
		hideMessage: function(){
			$('messageBox, messageBox close').fadeOut();
			clearTimeout(this.timer);
		}
	};
	//set up click event to hide
	$('messageBox').on('click', SD.message.hideMessage);
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

//			c('Connection type: ' + states[networkState]);
		}else{
			c('Connection not ready yet');
		}
	};

/*==================================================
 Display functions
 ================================================== */
	SD.locationSucess = function(position) {
		if(!SD.SEXDEFAULTS.location[0]){
			$.ajax({
				url: 'http://nominatim.openstreetmap.org/reverse',
				dataType: "json",
				data: {
					'format': 'json',
					'lat': position.coords.latitude,
					'lon': position.coords.longitude,
					'zoom' : 18
				},
				error: function(data){
					SD.overlay.hideme();
				},
				success: function(data){
					SD.SEXDEFAULTS.location[0] = data;
					SD.SEXDEFAULTS.location[1] = data.address.city_district + ', '+ data.address.city +', '+data.address.country_code.toUpperCase();
					$('location location').html(SD.SEXDEFAULTS.location[1]);
					SD.overlay.hideme();
				}
			});
		}
	};
	SD.locationFail = function (error) {
		alert('code: '    + error.code    + '\n' +
			'message: ' + error.message + '\n');
		SD.overlay.hideme();
	}


	/*==================================================
	Init for SD
	================================================== */
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
