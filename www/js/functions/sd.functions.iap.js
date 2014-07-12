define([

], function () {
	'use strict';

	SD.IAP = {
		init: function(){
			//setart iOS IAP
			SD.IAP.iOS.initialize();
		},
		instances:{}
	};

	SD.IAP.iOS = {
		list: [ "One_year_Extra_Details", "lifetimeaddons" ]
	};    var localStorage = window.localStorage || {};

	SD.IAP.iOS.initialize = function () {
		// Check availability of the storekit plugin
		if (!window.storekit) {
			c('In-App Purchases not available');
			return;
		}

		// Initialize
		storekit.init({
            debug:true,
			ready:    SD.IAP.iOS.onReady,
			purchase: SD.IAP.iOS.onPurchase,
			restore:  SD.IAP.iOS.onRestore,
			error:    SD.IAP.iOS.onError
		});
	};

	SD.IAP.iOS.onReady = function () {
		// Once setup is done, load all product data.
		storekit.load(SD.IAP.iOS.list, function (products, invalidIds) {
			c('SD.IAP.iOSs loading done:');
			for (var j = 0; j < products.length; ++j) {
				var p = products[j];
				c('Loaded SD.IAP.iOS(' + j + '). title:' + p.title +
					' description:' + p.description +
					' price:' + p.price +
					' id:' + p.id);
				SD.IAP.iOS.products[p.id] = p;
			}
			SD.IAP.iOS.loaded = true;
			for (var i = 0; i < invalidIds.length; ++i) {
				c('Error: could not load ' + invalidIds[i]);
			}
		});
	};

	SD.IAP.iOS.onPurchase = function (transactionId, productId/*, receipt*/) {
		var n = (localStorage['storekit.' + productId]|0) + 1;
		localStorage['storekit.' + productId] = n;
		if (SD.IAP.iOS.purchaseCallback) {
			SD.IAP.iOS.purchaseCallback(productId);
			delete SD.IAP.iOS.purchaseCallbackl;
		}
	};

	SD.IAP.iOS.onError = function (errorCode, errorMessage) {
		alert('Error: ' + errorMessage);
	};

	SD.IAP.iOS.onRestore = function (transactionId, productId/*, transactionReceipt*/) {
		var n = (localStorage['storekit.' + productId]|0) + 1;
		localStorage['storekit.' + productId] = n;
	};

	SD.IAP.iOS.buy = function (productId, callback) {
		SD.IAP.iOS.purchaseCallback = callback;
		storekit.purchase(productId);
	};

	SD.IAP.iOS.restore = function () {
		storekit.restore();
	};

	SD.IAP.iOS.fullVersion = function () {
		return localStorage['storekit.babygooinapp1'];
	};

//    SD.IAP.init();
    return SD.IAP;
});