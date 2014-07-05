/*
 ==================================================
 Table of Contents - Created by Hutber on 21/05/13.
 ==================================================
 */
define([
], function () {

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
				//we add a session marker to tell the pin view that we are coming from the login and don't display the pin
				sessionStorage.setItem('blockpin',false);
				//Now we load the home page
				SD.login.moveToHome(true);
			}else{
				SD.message.showMessage(data.message, 'bad');
			}
		},
		checkPrivateKey: function(){
			var numberOfTrys = 0;
			SD.spinner.show('Looking up', 'We are checking if you  have logged in on another device');
			var checkKey = $.ajax({
				url: SD.AJAX+'users/checkKey',
				type: 'POST',
				dataType: "json",
				data: {
					'ierihias': localStorage.uid,
					'adfbse4': localStorage.privateKey
				},
				error: function(data){
					c(numberOfTrys);
					if(numberOfTrys===0){
						numberOfTrys= 1;
						c(numberOfTrys);
						checkKey;
					}else{
						c(numberOfTrys);
						SD.message.showMessage('There was a network error.', 'bad');
						SD.spinner.hide();
					}
				},
				success: function(data){
					if(data.current==="1"){
						localStorage.setItem('GLOBALSEXNUMBERS',JSON.stringify(data.GLOBALSEXNUMBERS));
						SD.login.moveToHome();
						SD.spinner.hide();
					}else{
						alert('You have logged in somewhere else. We\'ll restart your session.');
//						alert('You have logged in somewhere else since using this app. For security we\'ll need to log you out, please log back in after.');
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

	return SD;
});