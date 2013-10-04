/**
 * Created by Hutber on 04/10/13.
 */
var SD = {}; //define SD so we can use it globally

var c = false;
if (typeof console === "object" && typeof console.error === "function") {
	c = function (msg) {
		console.info(msg);
	};
} else {
	c = function (msg) {
		alert(msg);
	};
}

SD.isMobile = true;
if (document.URL.indexOf("local") > 0 || document.URL.indexOf("sex") > 0) {
	SD.isMobile = false;
}

if (SD.isMobile){
	window.onerror = function (msg, url, linenumber) {
		alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
		return true;
	};
}