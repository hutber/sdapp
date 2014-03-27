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
	'JST',
	'fastclick',
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
			if(localStorage.getItem('privateKey')===null){
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
		TOTALSEXNUMBERS: {},
		SEXNUMBERS: {},
		GLOBALSEXNUMBERS: {},
		FULLSEX: {},
		WHO: null,
		TEMPLATE: 'footerout',
		HASH:'',
		PREVIOUSHASH:'',
		SLIDER: null,
		VIEWS: {},
		ROUTER: false,
	};

	SD.AJAX = SD.HTTP+'app/',
	SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';

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
			case "m.sexdiaries.co.uk":
					SD.ENVIROMENT = 'mobilesite';
				break;
		}
	};

/*==================================================
Login functions
================================================== */
SD.login = {
	checkLoginState : function() { //We use this state to enable us to use the function on every page load to check if the user is logged in
		var hash = window.location.hash.substring(1);
		var loggedInState = true;
		if(localStorage.getItem('privateKey')=== null) {loggedInState = false;}

		if(sessionStorage.tmpPin){
		//Top level, if the user hasn't set a pin number
		}else if(loggedInState && !localStorage.pinNumber){
			window.location.href = "#setpin";
		}else if(sessionStorage.appOpenedFirstTime && hash!=="pin" && loggedInState){
			window.location.href = "#pin";
		}else if( loggedInState && (hash==="" || hash==="signup" || hash==="forgotten" || hash==="login")){
			window.location.href = "#home";
		}else if (!loggedInState && hash==="home" ){
			document.location.replace('');
		}
	}
};

/*==================================================
Routes/Views
================================================== */

SD.changeHeightofContent = function(){
	if($('footer').is(':visible')){
		SD.pageHeight = $('body').outerHeight() - ($('header').outerHeight() + $('footer').outerHeight());
	}else{
		SD.pageHeight = $('body').outerHeight() - ($('header').outerHeight());
	}
	$('page').css({height:SD.pageHeight});
};

SD.onHashChange = function(){
	//make sure we are logged in, if we are not forward back to home page
	SD.login.checkLoginState();

	//Updated previous hash
	SD.PREVIOUSHASH = SD.HASH;

	//Update the new hash
	SD.HASH = window.location.hash.substring(1);

	//On page load update body class with current page
	SD.DV.globalClass();

	//Resize the $('page') element
	SD.changeHeightofContent();

	//update menu items with selected item
	$('menu a.selected').removeAttr('class');
	$('menu a[data-id='+SD.HASH+']').addClass('selected');
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
		if(localStorage.privateKey){
			var saveSexDetails = SD.addSex.convertPhp();
			$.ajax({
				url: SD.AJAX+'add',
				type: 'POST',
				data: {
					info: saveSexDetails,
					privateKey: localStorage.privateKey
				},
				error: function(data){
					SD.message.showMessage('Adding Failed, server side problem: '+ data.status, 'bad');
				},
				success: function(data){
					if(data===""){
						//Update sex stats with new sex
						SD.GLOBALSEXNUMBERS[Object.keys(SD.GLOBALSEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.SEXNUMBERS[Object.keys(SD.SEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.TOTALSEXNUMBERS[Object.keys(SD.TOTALSEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.message.showMessage('Entry has been added and all stats updated, fuck ye man...', 'good', 2500);
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

	/*==================================================
	Loading
	================================================== */
	SD.spinner = {
		show: function(title, message){
			if(typeof title!=="string"){
				title = null;
			}
			if(typeof message!=="string"){
				message = null;
			}
			if(window && window.plugins && window.plugins.spinnerDialog){
				window.plugins.spinnerDialog.show(title,message);
			}else{
				SD.overlay.showme();
			}
		},
		hide: function(){
			if(window && window.plugins && window.plugins.spinnerDialog){
				window.plugins.spinnerDialog.hide();
			}else{
				SD.overlay.hideme();
			}
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

		//Update the current view, don't re-redner it
		SD.ROUTER.navigate(useme, true);
	};

	SD.message = {
		timer: null,
		showMessage: function(message, type, duration){
			if(typeof duration === "undefined") duration = 5000;
			$('messageBox message').find('div').html(message);
			$('messageBox').removeAttr('class').attr('class',type+' show');
			this.timer = setTimeout(this.hideMessage, duration);
		},
		hideMessage: function(){
			$('messageBox').removeClass('show').delay('500').removeAttr('class');
			clearTimeout(this.timer);
		}
	};
	//set up click event to hide
	$('messageBox').on('click', SD.message.hideMessage);

// #Location ajax formating -------------------------------------------------------------
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

//			c('Connection type: ' + states[networkState]);
		}else{
			c('Connection not ready yet');
		}
	};

/*==================================================
 Formatting Results
 ================================================== */
// #SEXNUMBERS ------------------------------------------------------
	SD.convertSexNumbers = {
		init: function(){
			if(localStorage.SEXNUMBERS !=="" && jQuery.isEmptyObject(SD.SEXNUMBERS)){
				this.convert(localStorage.SEXNUMBERS, SD.SEXNUMBERS);
			}
			if(localStorage.TOTALSEXNUMBERS !=="" && jQuery.isEmptyObject(SD.TOTALSEXNUMBERS)){
				this.convert(localStorage.TOTALSEXNUMBERS, SD.TOTALSEXNUMBERS);
			}
			if(localStorage.GLOBALSEXNUMBERS !=="" && jQuery.isEmptyObject(SD.GLOBALSEXNUMBERS)){
				this.convert(localStorage.GLOBALSEXNUMBERS, SD.GLOBALSEXNUMBERS);
			}
		},
		convert: function(item, target){
			JSON.parse(item).forEach(function(me){
				if(typeof me==="object"){
					var sexName = me.sex,
						sexNumber = +me.no;

					switch (sexName){
						case "1":
							target.Wank = sexNumber;
							break;
						case "2":
							target.Hands = sexNumber;
							break;
						case "3":
							target.Oral = sexNumber;
							break;
						case "4":
							target.Sex = sexNumber;
							break;
						case "5":
							target.Anything = sexNumber;
							break;
					}
				}else{
					target.total = me;
				}
			});
		}
	};

	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	/*==================================================
	Init for SD
	================================================== */
	SD.init = function () {

		//Try and make clicks faster
		FastClick.attach(document.body);

		SD.globals(); //set up our global variables

		//Set up scripts to get loaded depending on envoiment
		if(SD.isMobile || SD.ENVIROMENT==="liveApp"){

			//This checker will active when the app is closed, on repoen this gets set and user has to enter their pin number
			sessionStorage.setItem('appOpenedFirstTime',true);

			$.getScript('cordova.js', function( data, textStatus, jqxhr){
				var s = document.createElement('script');
				s.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
				document.getElementsByTagName('body')[0].appendChild(s);
			});
		}else{
			$.getScript('http://localhost:35729/livereload.js');
		}

		//Set up hash change for every time it changes
		SD.onHashChange();
		window.addEventListener("hashchange", SD.onHashChange, false);

		//Remove debugs if they are there
		$('debug').on('click', 'li:first', function(){ $('debug li').remove(); });
	};

//return SD
	return SD;
});
