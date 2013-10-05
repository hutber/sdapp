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
		if(typeof msg ==="object"){
			alert('Length: '+ msg.length +'\nType: '+typeof msg[0] +'\nError message: ' + msg[0] + '\nURL: ' + url[0] + '\nLine Number: ' + linenumber[0]);
			var t="";
			for (var o in msg) {t+= o+":"+msg[o]+"\n";}
		}else{
			alert('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
		}
		return true;
	};
}