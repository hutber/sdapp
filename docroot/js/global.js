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
		alert(msg);
	};
}

/*==================================================
 Error handling on mobile
 ================================================== */
if (SD.isMobile){
//		window.onerror = function(error) { console.log(error);return true; };
	window.onerror = function (msg, url, linenumber) {
//		if(typeof msg ==="object"){
//			for (var key in msg) {
//				var obj = msg[key];
//				for (var prop in obj) {
////					important check that this is objects own property
////					not from prototype prop inherited
//					if(obj.hasOwnProperty(prop)){
//						alert(prop + " = " + obj[prop]);
//					}
//				}
//			}
//
////			var newArray = [];
////			for (var key in msg) {
////				newArray.push(key);
////			}
////			newArray.forEach(function(elm){
////				alert(elm);
////			});
//		}else{
			alert('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
//		}
		return true;
	};
}