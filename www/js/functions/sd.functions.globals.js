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
	'fastclick',
], function (fastclick) {
	'use strict';

	//Straight up just start fastclick if needed
	fastclick.attach(document.body);

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
Globals
================================================== */

// #Globals for SD ------------------------------------------------------
	//Setup fullsex so we can build other numbers from this.
	SD.VERSION = '0.0.38';
	SD.ENVIROMENT = 'liveApp';
	SD.CDN = 'www.sexdiaries.co.uk/';
	SD.HTTP = 'https://www.sexdiaries.co.uk/';
	SD.STATE = function(){
		if(localStorage.getItem('privateKey')===null){
			return false;
		}else{
			$('body').data('state','loggedin');
			return true;
		}
	}();
	SD.CURRENTSEX = 'na';
	SD.SEXDEFAULTS = SD.sex.sexDefaults();
	SD.TOTALSEXNUMBERS = function (){
		if(typeof localStorage.TOTALSEXNUMBERS !== "undefined"){
			return JSON.parse(localStorage.TOTALSEXNUMBERS);
		}else{
			return {};
		}
	}();
	SD.SEXNUMBERS = function (){
		if(typeof localStorage.SEXNUMBERS !== "undefined"){
			return JSON.parse(localStorage.SEXNUMBERS);
		}else{
			return {};
		}
	}();
	SD.GLOBALSEXNUMBERS = function (){
		if(typeof localStorage.GLOBALSEXNUMBERS !== "undefined"){
			return JSON.parse(localStorage.GLOBALSEXNUMBERS);
		}else{
			return {};
		}
	}();
	SD.BYMONTH = function (){
		if(typeof localStorage.BYMONTH !== "undefined"){
			return JSON.parse(localStorage.BYMONTH);
		}else{
			return {};
		}
	}();
	SD.WHO = function (){
		if(typeof localStorage.WHO !== "undefined"){
			return JSON.parse(localStorage.WHO);
		}else{
			return {};
		}
	}();
	SD.POSITIONS = {
		1:'Missionary',
		2:'Doggy Style',
		3:'Reverse Cowgirl',
		4:'69',
		5:'Girl on Top',
		6:'Afternoon Delight',
		7:'Amazon',
		8:'Ape',
		9:'Ascent To Desire',
		10:'Backward Slide',
		11:'Balancing Act',
		12:'Basket',
		13:'Bridge',
		14:'Butterfly',
		15:'Bandoleer',
		16:'Candle',
		17:'Catherine Wheel',
		18:'Challenge',
		19:'Clasp',
		20:'Close Up',
		21:'Column',
		22:'Criss Cross',
		23:'Cross',
		24:'Crossed Keys',
		25:'Crouching Tiger',
		26:'Curled Angel',
		27:'Deck Chair',
		28:'Dolph',
		29:'Dcouble Decker',
		30:'Eagle',
		31:'Fan',
		32:'Fantastic Rocking Horse',
		33:'Fold',
		34:'Frog',
		35:'Gallery',
		36:'G-Force',
		37:'Glowing Juinper',
		38:'Glowing Triangle',
		39:'Grip',
		40:'Hero',
		41:'Hinge',
		42:'Hound',
		43:'Indrani',
		44:'Knell',
		45:'Kneeling Wheelbarrow',
		46:'Landslide',
		47:'Lotus Blossom',
		48:'Magic Mountain',
		49:'Mermain',
		50:'Nirvana',
		51:'Peg',
		52:'Plough',
		53:'Prine Tiger',
		54:'Properller',
		55:'Proposal',
		56:'Reclining Lotus',
		57:'Right Angle',
		58:'Rock\'n-Roller',
		59:'Rowing Boat',
		60:'Seated Ball',
		61:'Seduction',
		62:'Shoulde Stand',
		63:'Side Kick',
		64:'Side Saddle',
		65:'Sidewards Samba',
		66:'Slide',
		67:'Slip',
		68:'Snail',
		69:'Sphnix',
		70:'Spider',
		71:'Splitting Bamboo',
		72:'Squat Balance',
		73:'Standing Wheelbarrow',
		74:'Star',
		75:'Supernova',
		76:'Suspended Congress',
		77:'Suspended Scissors',
		78:'Thigh Master',
		79:'Tominagi',
		80:'Triumph Arch',
		81:'Visitor',
		82:'Whistper',
		83:'Widley Opened',
		84:'Y-Curve',
	};
	SD.TEMPLATE = 'footerout';
	SD.HASH = '';
	SD.PREVIOUSHASH = '';
	SD.SLIDER = null;
	SD.VIEWS = {};
	SD.ROUTER = false;

// #Build up Stats for SD ------------------------------------------------------

//Setup SD vars for ajax requests
	SD.AJAX = SD.HTTP+'app/',
	SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';

//check type of envoiment we are in
	function checkEnvio () {
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
				SD.ENVIROMENT = 'stagingApp',
					SD.CDN = 'stage.sexdiaries.co.uk/',
					SD.HTTP = 'http://stage.sexdiaries.co.uk/',
					SD.AJAX = SD.HTTP+'app/',
					SD.SEXDEFAULTS.url = SD.HTTP+'stats/add';
				break;
		}
	}

// #Build FULLSEX and check we are in the correct app version ------------------------------------------------------

	SD.FULLSEXRUN = function (){
		if(SD.STATE === true && localStorage.version !== SD.VERSION){
			SD.spinner.showme('We\'re updating you to the latest version, sit tight.', 'Update required');
			$.ajax({
				url: SD.AJAX+'users/getLatestStats',
				type: 'POST',
				dataType: "json",
				data: {
					'uid': localStorage.uid,
					'privateKey': localStorage.privateKey,
					'version': SD.VERSION
				},
				error: function(data){
					if(data.status === 200){
						SD.message.showMessage('Opps, sorry just hit login one more time.');
					}else{
						SD.message.showMessage('Error Code: '+data.status, 'bad');
					}
					SD.spinner.hideme();
				},
				success: function(data){
					SD.spinner.hideme();
					if(data.code === 1 ){
						localStorage.version = SD.VERSION;
						if(typeof localStorage.FULLSEX !== "undefined" && localStorage.FULLSEX !== "[]"){
							SD.FULLSEX = JSON.parse(localStorage.FULLSEX);
						}else{
							SD.FULLSEX = {};
						}
					}else{
						SD.login.checkPrivateKey.makeCall();
					}
				}
			});
		}
	};

// #define the globals depending on place we are ------------------------------------------------------
	SD.globals = function () {
		if(window.location.protocol === "file:"){
			$.ajax({
				url:'icon-76-2x.png',
				type:'HEAD',
				error: function()
				{
					checkEnvio();
				},
				success: function()
				{
//					c('//file exists');
				}
			});
		}else{
			checkEnvio();
		}
		SD.FULLSEXRUN();
	};


/*==================================================
localStorage - SD Gloabls
================================================== */
	SD.saveVar = function(variable) {
		localStorage[variable] = JSON.stringify(SD[variable]);
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
			if(typeof sessionStorage.blockpin === "undefined" ){
				sessionStorage.setItem('appOpenedFirstTime',true);
			}
			sessionStorage.removeItem('blockpin');

			//load in cordova.js if its not already there
			if(typeof cordova === "undefined"){
				var c = document.createElement('script');
				c.setAttribute("src","cordova.js");
				document.body.appendChild(c);
			}

			//add phonegap debugging script
			//var d = document.createElement('script');
			//d.setAttribute("src","http://debug.build.phonegap.com/target/target-script-min.js#hutber");
			//document.getElementsByTagName('body')[0].appendChild(d);
		}else{
			$.getScript('http://localhost:35729/livereload.js');
		}

		//Set up hash change for every time it changes
		SD.globalEvents.onHashChange();
		window.addEventListener("hashchange", SD.globalEvents.onHashChange, false);

		//Remove debugs if they are there
		$('debug').on('click', 'li:first', function(){ $('debug li').remove(); });

		//add SD.changeHeightofContent(); to window resize
		$( window ).resize(function() {
			SD.changeHeightofContent();
		});

		//add click to hide overlay button on click
		$('overlay .icon-cancel-circled').click(SD.spinner.hideme);
	};
});
