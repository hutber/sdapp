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
		};
	}

/*==================================================
Requests
================================================== */
//	function loadJs(src, callback, target) {
//		if(typeof target === "undefined"){
//			target = 'head';
//		}
//		var s = document.createElement('script');
//		document.getElementsByTagName(target)[0].appendChild(s);
//		s.onload = function() {
//			//callback if existent.
//			if (typeof callback === "function") {callback();}
//			callback = null;
//		};
//		s.onreadystatechange = function() {
//			if (s.readyState === 4 || s.readyState === "complete") {
//				if (typeof callback === "function") {callback();}
//				callback = null; // Wipe callback, to prevent multiple calls.
//			}
//		};
//		s.src = src;
//	}
//
//	function myAjax(url, method, parameters, onComplete, onError) {
//		var xmlHttp = new XMLHttpRequest();
//		xmlHttp.open(method, url, true);
//
//		//Black magic paragraph
//		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//		xmlHttp.setRequestHeader("Content-length", parameters.length);
//		xmlHttp.setRequestHeader("Connection", "close");
//
//		xmlHttp.onreadystatechange = function() {
//			if (xmlHttp.readyState === 4) {
//				if(xmlHttp.status === 200) {
//					//document.getElementById("xmlResults").innerHTML = xmlhttp.responseText;
//					onComplete(xmlHttp.responseText);
//				} else {
//					onError(xmlHttp.status);
//				}
//			}
//		};
//
//		xmlHttp.send(parameters);
//	}

/*==================================================
 Error handling on mobile
 ================================================== */

//#alert errors ----------------------------------------------------
	if (SD.isMobile){
		window.onerror = function (msg, url, linenumber) {
			if(typeof msg ==="object"){
				for (var key in msg) {
					var obj = msg[key];
					for (var prop in obj) {
	//					important check that this is objects own property
	//					not from prototype prop inherited
						if(obj.hasOwnProperty(prop)){
							var myself = obj[prop];
							if(typeof(myself) === 'string'){
								c(prop + " = " + myself);
							}
							else if (myself !== null && myself.toString){
								myself = myself.toString();
								c(myself);
							}
						}
					}
				}
	//			var newArray = [];
	//			for (var key in msg) {
	//				newArray.push(key);
	//			}
	//			newArray.forEach(function(elm){
	//				alert(elm);
	//			});
			}else{
				c('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
			}
			return true;
		};
	}