/*
 ==================================================
 Table of Contents - Created by Hutber on 04/10/13.
 ==================================================
 #isMobile
 #C
 #Erorr handling
 */

//Define SD
	var SD = {}; //define SD so we can use it globally

/*==================================================
Is Mobile - If true then we are a mobile
================================================== */
	SD.isMobile = true;
	if (document.URL.indexOf("local") > 0 || document.URL.indexOf("sex") > 0) {
		SD.isMobile = false;
	}

	//# Debug on the page ----------------------------------------------------
	function debug (msg) {
		var me = document.getElementsByTagName('debug'),
		myself = me[0].firstElementChild.innerHTML;
		me[0].firstElementChild.innerHTML = myself+'<li>'+ msg +'</li>';
	}

/*==================================================
Bind C to be alert on mobile console.log in desktop
================================================== */
	var c = false;
	if (typeof console === "object" && typeof console.error === "function" && !SD.isMobile) {
		c = function (msg) {
			console.info(msg);
		};
	} else {
		c = function (msg) {
			debug(msg);
			console.info(msg);
		};
	}

/*==================================================
 Error handling on mobile
 ================================================== */

//#alert errors ----------------------------------------------------
	if (SD.isMobile){
		window.onerror = function (msg, url, linenumber) {
			c('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
			return true;
		};
	}
//// Show spinner dialog
//window.plugins.spinnerDialog.show();
//
//// Show spinner dialog with message (only on Android)
//window.plugins.spinnerDialog.show("title","message");
//
//// Hide spinner dialog
//window.plugins.spinnerDialog.hide();
