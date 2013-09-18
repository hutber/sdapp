/**
 * Created by Hutber on 13/09/13.
 */
define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	'use strict';

	SD = {
		ENVIROMENT: 'liveApp',
		CDN: 'm.sexdiaries.co.uk/',
		HTTP: 'http://m.sexdiaries.co.uk/',
		AJAX: SD.HTTP
	};

	SD.init = function () {
		SD.globals(); //set up our global variables
		$(window).resize(function(){
			SD.centerItems($('content')); //center the items in the middle of the page
		});
	};

	SD.globals = function () {
		switch (window.location.hostname) {
			case "sd.local":
				SD.ENVIROMENT = 'localApp',
					SD.CDN = 'sd.local/',
					SD.HTTP = 'http://sd.local/',
					SD.AJAX = 'http://sexdiaires.local/app/';
				break;
		}
	};

	SD.centerItems = function (eleme) {
		var appHeight = $(document).outerHeight(),
			bodyHeight = eleme.outerHeight(),
			middleHeight = (appHeight / 2) - (bodyHeight / 2);

		eleme.css({top: middleHeight, position: 'absolute'});
	};

	SD.checkConnection = function () {
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';

		alert('Connection type: ' + states[networkState]);
	};

	SD.overlay = {
		init: function(elem) {
			SD.centerItems(elem);
		},
		showme: function(){
			$('overlay').fadeIn();
		},
		hideme: function(){
			$('overlay').fadeOut('fast');
		}
	};

	SD.init();
	return SD;
});
