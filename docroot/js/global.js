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
//	window.onerror = function (msg, url, linenumber) {
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
		window.onerror = function(error) { console.log(error); };
//			alert('Type: '+typeof msg +'\nError message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
//		}
//		return true;
//	};
}