/*
 ==================================================
 Table of Contents - Created by Hutber on 13/09/13.
 ==================================================
 */
define([
], function () {

	SD.selection = {};

	SD.selection.safeOutput = function(data) {
		if(typeof data !== "object"){ data = JSON.parse(data);}
		var tempString = "",
			dataArray = Object.keys(data);

		if(typeof dataArray === "object" ){
			dataArray.forEach(function(info){
				tempString+=info+', ';
			});
			var dataLengthString = tempString.length-2;
			return tempString.substr(0,dataLengthString);
		}else{
			return data;
		}
	};

	return SD;
});