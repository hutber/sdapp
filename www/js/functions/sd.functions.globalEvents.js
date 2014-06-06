/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
	'mobiscroll',
	'mobiscrollScroller',
	'mobiscrollDate',
], function () {

	SD.globalEvents = {};

	SD.globalEvents.onHashChange = function(){
		//make sure we are logged in, if we are not forward back to home page
		SD.login.checkLoginState();

		//Updated previous hash
		SD.PREVIOUSHASH = SD.HASH;

		//Update the new hash
		SD.HASH = window.location.hash.substring(1);

		//On page load update body class with current page
		SD.DV.globalClass();

		//Resize the $('page') element
		SD.changeHeightofContent();

		//update menu items with selected item
		$('menu a.selected').removeAttr('class');
		$('menu a[data-id='+SD.HASH+']').addClass('selected');
	};

	return SD;
});