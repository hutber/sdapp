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
	//Setup fullsex so we can build other numbers from this.
	SD = {
		isMobile: SD.isMobile,
		ENVIROMENT: 'liveApp',
//		CDN: 'www.sexdiaries.co.uk/',
//		HTTP: 'https://www.sexdiaries.co.uk/',
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
			diary: "",
			where: {},
		},
		FULLSEX: function (){
			if(typeof localStorage.FULLSEX !== "undefined"){
				return JSON.parse(localStorage.FULLSEX);
			}else{
				return {};
			}
		}(),
		TOTALSEXNUMBERS: function (){
			if(typeof localStorage.TOTALSEXNUMBERS !== "undefined"){
				return JSON.parse(localStorage.TOTALSEXNUMBERS);
			}else{
				return {};
			}
		}(),
		SEXNUMBERS: function (){
			if(typeof localStorage.SEXNUMBERS !== "undefined"){
				return JSON.parse(localStorage.SEXNUMBERS);
			}else{
				return {};
			}
		}(),
		GLOBALSEXNUMBERS: function (){
			if(typeof localStorage.GLOBALSEXNUMBERS !== "undefined"){
				return JSON.parse(localStorage.GLOBALSEXNUMBERS);
			}else{
				return {};
			}
		}(),
		BYMONTH: function (){
			if(typeof localStorage.BYMONTH !== "undefined"){
				return JSON.parse(localStorage.BYMONTH);
			}else{
				return {};
			}
		}(),
		WHO: function (){
			if(typeof localStorage.WHO !== "undefined"){
				return JSON.parse(localStorage.WHO);
			}else{
				return {};
			}
		}(),
		TEMPLATE: 'footerout',
		HASH:'',
		PREVIOUSHASH:'',
		SLIDER: null,
		VIEWS: {},
		ROUTER: false,
	};

// #Build up Stats for SD ------------------------------------------------------

//Setup SD vars for ajax requests
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
	moveToHome: function(reload){
		if(typeof reload === "undefined") {reload = false;} //if no reload is passed make it false
		sessionStorage.removeItem('appOpenedFirstTime');
		if(reload){
			location.reload();
		}else {
			window.location.href = "#home";
		}
	},
	doLogin: function(data){
		if(data.privateKey){
			Object.keys(data).forEach(function(key){
				var me = data[key];
				if(typeof me === "string"){ //If I'm a string then just add it to locastorage
					localStorage.setItem(key,me);
				}else if (typeof me === "object"){ //If we are an object then stringify if
					localStorage.setItem(key,JSON.stringify(me));
				}
			});
			SD.login.moveToHome(true);
		}else{
			SD.message.showMessage(data.message, 'bad');
		}
	},
	checkPrivateKey: function(){
		SD.spinner.show('Looking up', 'We are checking if you  have logged in on another device');
		$.ajax({
			url: SD.AJAX+'users/checkKey',
			type: 'POST',
			dataType: "json",
			data: {
				'ierihias': localStorage.uid,
				'adfbse4': localStorage.privateKey
			},
			error: function(data){
				SD.message.showMessage('There was a network error.', 'bad');
				SD.spinner.hide();
			},
			success: function(data){
				if(data.current==="1"){
					SD.login.moveToHome();
					SD.spinner.hide();
				}else{
					alert('You have logged in somewhere else since using this app. For security you\'ll need to log in again.');
					SD.login.doLogOut();
				}
			}
		});
	},
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
	},
	doLogOut: function(){
		var tmpPin = localStorage.pinNumber;
		localStorage.clear();
		localStorage.setItem('pinNumber', tmpPin);
		document.location.replace('');
		return false;
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
SD.manageSex = {
	buildMissing: function(data, sid){
		//set up defaults
		return {
			city:function(){
				return (typeof data.locationcity !== "undefined") ? data.locationcity : null;
			}(),
			country:function(){
				return (typeof data.locationcountry !== "undefined") ? data.locationcountry : null;
			}(),
			datetring:Date.parse(data.sextime).toString('ddd dS HH:mm'),
			id:sid,
			position:1,
			rating:""+data.rating,
			sexnumber:""+data.sexnumber,
			sexstring:function(){
				return (typeof data.sexstring !== "undefined") ? data.sexstring: SD.format.toString(parseInt(data.sexnumber));
			}(),
			sextime:data.sextime,
			uid:localStorage.uid,
			diary:data.diary,
			who:function(){
				return (typeof data.country !== "undefined") ? data.who : null;
			}()
		};
	},
	convertPhp: function(){
		var php = {};
		php.sexnumber = SD.SEXDEFAULTS.sexnumber;
		if(typeof SD.SEXDEFAULTS.sextime[0] === "object"){
			php.sextime = Date.parse(SD.SEXDEFAULTS.sextime[0].getDate()).toString('s');
		}else{
			php.sextime = Date.parse(SD.SEXDEFAULTS.sextime[0]).toString('s');
		}
		php.rating = SD.SEXDEFAULTS.rating;
		php.diary = SD.SEXDEFAULTS.diary;

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
			SD.spinner.show();
			var saveSexDetails = SD.manageSex.convertPhp();
			$.ajax({
				url: SD.AJAX+'add',
				type: 'POST',
				dataType: "json",
				data: {
					info: saveSexDetails,
					privateKey: localStorage.privateKey
				},
				error: function(data){
					SD.spinner.hide();
					SD.message.showMessage('Adding Failed, server side problem: '+ data.status, 'bad');
				},
				success: function(data){
					if(isNumber(data)){
						/*==================================================
						Update FULLSEX and create some var's
						================================================== */
						// Build a new array to add to SD.FULLSEX
						var newSexDetail  = SD.manageSex.buildMissing(saveSexDetails, data);
						var sexTime = Date.parse(saveSexDetails.sextime);
						//Grab current moth as string
						var currentMonthString = sexTime.toString("MMMyy");
						//unshift currently converted sex details to array
						if(typeof SD.FULLSEX[currentMonthString] !== "undefined") {
							SD.FULLSEX[currentMonthString].unshift(newSexDetail);
							SD.saveVar('FULLSEX');
						} else {
							SD.FULLSEX[currentMonthString] = [newSexDetail];
							localStorage.setItem('FULLSEX',JSON.stringify(SD.FULLSEX));
						}

						/*==================================================
						Update Sex Data Graph
						================================================== */
						var sexTypeString = newSexDetail.sexstring;
						//Make sure we have added a sex before
						if(typeof SD.BYMONTH[sexTypeString][currentMonthString] !== "undefined") {
							//plus 1 to the number off in a given month
							SD.BYMONTH[sexTypeString][currentMonthString].numberof++;
							SD.saveVar('BYMONTH');
						} else {
							//TODO shoudlnt' get the date from today, as user could have set it in the past
							SD.BYMONTH[sexTypeString][currentMonthString] = {"numberof":1,"date": sexTime.toString("Myy")};
							localStorage.setItem('BYMONTH',JSON.stringify(SD.BYMONTH));
						}

						/*==================================================
						Update Whos - Find the who then add the who
						================================================== */
						if(saveSexDetails.who){
							Object.keys(saveSexDetails.who).forEach(function(myself){
								SD.WHO.forEach(function(me){
									if(me.who===myself){
										me.useage++;
										me.useage = me.useage+"";
									}
								});
							});
							SD.saveVar('WHO');
						}

						/*==================================================
						Update Sex Numbers
						================================================== */
						SD.GLOBALSEXNUMBERS[Object.keys(SD.GLOBALSEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.GLOBALSEXNUMBERS.total++;
						SD.saveVar('GLOBALSEXNUMBERS');
						SD.SEXNUMBERS[Object.keys(SD.SEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.SEXNUMBERS.total++;
						SD.saveVar('SEXNUMBERS');
						SD.TOTALSEXNUMBERS[Object.keys(SD.TOTALSEXNUMBERS)[saveSexDetails.sexnumber-1]]++;
						SD.TOTALSEXNUMBERS.total++;
						SD.saveVar('TOTALSEXNUMBERS');

						//Move us home after resetting all the sex details
						SD.SEXDEFAULTS = {
							sextype: 'default',
							sexnumber: 0,
							image: '/img/path.jpg',
							sextime:[false,false],
							who: {},
							rating: 0,
							location: [false, 'Click to get your location'],
							diary: "",
							where: {},
						};
						SD.pageLoad('overview');
						SD.spinner.hide();
						//display completled sex
						SD.message.showMessage('Sex added you cheeky sod', 'good', 2500);
					}else{
						if(data==="We could not get your User Id, sorry"){
							alert('You have logged in somewhere else, we will force a logout');
							SD.login.doLogOut();
						}
						SD.message.showMessage('Something went wrong whilst adding the entry. Ek ermm... check if its there maybe?', 'bad', 6000);
					}
				}
			});
		}else{
			SD.message.showMessage('You appear to not be logged in?', 'bad');
		}
	},
	removeSex: function(sexId, text, deleteArea){
		if(confirm('Do you really want to delete ' + text)){
			SD.spinner.show();
			$.ajax({
				url: SD.AJAX+'sex/deletesex',
				type: 'POST',
				data: {
					'id': sexId,
					'privateKey': localStorage.privateKey,
				},
				error: function(data){
					SD.spinner.hide();
					SD.message.showMessage('A server error occured, please try again >:|', 'bad', 1500);
				},
				success: function(data){
					SD.spinner.hide();
					if(data === ""){
						var toDeleteIndex = -1,
							toDeleteMonth = '',
							toDeleteSexString = '';

						//Loopthough all sexes in fullsex
						Object.keys(SD.FULLSEX).forEach(function(me){
							var i = 0;
							SD.FULLSEX[me].forEach(function(myself){
								var sid = parseInt(myself.id);
								if(parseInt(sexId) === sid){
									toDeleteMonth = me;
									toDeleteSexString = myself.sexstring;
									toDeleteIndex = i;
								}
								i++;
							});
						});
						SD.FULLSEX[toDeleteMonth].splice(toDeleteIndex, 1);
						//Replace localstorage for saving for user
						SD.saveVar('FULLSEX');

						//Remove sex stats from SD.BYMONTH
						SD.BYMONTH[toDeleteSexString][toDeleteMonth].numberof = SD.BYMONTH[toDeleteSexString][toDeleteMonth].numberof-1;
						//Replace localstorage for saving for user
						SD.saveVar('BYMONTH');

						/*==================================================
										Update Sex Numbers
						================================================== */
						SD.GLOBALSEXNUMBERS[toDeleteSexString]--;
						SD.GLOBALSEXNUMBERS.total--;
						SD.saveVar('GLOBALSEXNUMBERS');
						SD.SEXNUMBERS[toDeleteSexString]--;
						SD.SEXNUMBERS.total--;
						SD.saveVar('SEXNUMBERS');
						SD.TOTALSEXNUMBERS[toDeleteSexString]--;
						SD.TOTALSEXNUMBERS.total--;
						SD.saveVar('TOTALSEXNUMBERS');

						//update dropdown list
						var selectNewValue = $('#month option:selected');
						if(selectNewValue){
							selectNewValue.html(selectNewValue.html().replace(/\(.*?\)/, "("+ SD.FULLSEX[toDeleteMonth].length +")"));

						}

						deleteArea.fadeOut('500');
					}else{
						SD.message.showMessage('A server error occured, please try again :(', 'bad', 1500);
					}
				}
			});
		}
	},
};

/*==================================================
localStorage - SD Gloabls
================================================== */
	SD.saveVar = function(variable) {
		localStorage[variable] = JSON.stringify(SD[variable]);
	};

/*==================================================
Formatting Results
================================================== */
// #SEXNUMBERS ------------------------------------------------------
	SD.format = {
		toString: function(sex){
			var val = 'Anything';
			switch (sex) {
				case (1):
					val = 'Wank';
				break;
				case (2):
					val = 'Hands';
				break;
				case (3):
					val = 'Oral';
				break;
				case (4):
					val = 'Sex';
				break;
				case (5):
					val = 'Anything';
				break;
			}
			return val;
		},
		convertToLocal: function(item, target){
			if(typeof item !=="undefined"){
				JSON.parse(item).forEach(function(me){
					if(typeof me==="object"){
						var sexName = me.sexType,
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
		timer: null,
		icon: $('overlay .icon-cancel-circled'),
		show: function(title, message, timer){
			if(typeof title!=="string"){
				title = null;
			}
			if(typeof message!=="string"){
				message = null;
			}
			if(timer){
				SD.spinner.timer = window.setTimeout(SD.spinner.displayCloseButton , 5000);
			}
			if(window && window.plugins && window.plugins.spinnerDialog){
				window.plugins.spinnerDialog.show(title,message);
			}else{
				SD.overlay.showme();
			}
		},
		hide: function(){
			SD.spinner.icon.hide();
			window.clearTimeout(SD.spinner.timer);
			if(window && window.plugins && window.plugins.spinnerDialog){
				window.plugins.spinnerDialog.hide();
				SD.overlay.hideme();
			}else{
				SD.overlay.hideme();
			}
		},
		displayCloseButton: function(){
			SD.spinner.icon.fadeIn();
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
			$('messageBox').removeClass('show');
			clearTimeout(this.timer);
		}
	};

	//set up click event to hide
	$('messageBox').on('click', SD.message.hideMessage);

/*==================================================
Location ajax formating
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
					SD.spinner.hide();
				},
				success: function(data){
					SD.SEXDEFAULTS.location[0] = data;
					SD.SEXDEFAULTS.location[1] = data.address.city_district + ', '+ data.address.city +', '+data.address.country_code.toUpperCase();
					$('location location').html(SD.SEXDEFAULTS.location[1]);
					SD.spinner.hide();
				}
			});
		}
	};
	SD.locationFail = function (error) {
		SD.message.showMessage('Sorry, maybe your gps isn\'t turned on?', 'bad');
//		alert('code: '    + error.code    + '\n' +
//			'message: ' + error.message + '\n');

		SD.spinner.hide();
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

			//load in cordova.js if its not already there
//			if(typeof cordova === "undefined"){
//				var c = document.createElement('script');
//				c.setAttribute("src","cordova.js");
//				document.body.appendChild(c);
//			}

			//add phonegap debugging script
//			var d = document.createElement('script');
//			d.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
//			document.getElementsByTagName('body')[0].appendChild(d);
		}else{
			$.getScript('http://localhost:35729/livereload.js');
		}

		//Set up hash change for every time it changes
		SD.onHashChange();
		window.addEventListener("hashchange", SD.onHashChange, false);

		//Remove debugs if they are there
		$('debug').on('click', 'li:first', function(){ $('debug li').remove(); });

		//add SD.changeHeightofContent(); to window resize
		$( window ).resize(function() {
			SD.changeHeightofContent();
		});

		//add click to hide overlay button on click
		$('overlay .icon-cancel-circled').click(SD.spinner.hide);
	};

//return SD
	return SD;
});
