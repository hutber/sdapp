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
			Check if we are a number
================================================== */
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
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

/*==================================================
 Array Functions
 ================================================== */
Array.prototype.removeAllValues = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
Array.prototype.keepValue = function(val) {
	function checkMe(el){
		return val === el;
	}
	return this.filter(checkMe);
};