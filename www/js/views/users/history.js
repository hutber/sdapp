define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dsv',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var history = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/history.ejs'],
		render: function () {
			var myself = this;
			var sexDetails =
//			window.plugins.spinnerDialog.show("Sex History","Loading your sex history... Please Wait...");
				$.ajax({
					url: SD.AJAX+'sex/grabfullsex',
					dataType: "json",
					data: {
						'code': sessionStorage.privateKey,
					},
					error: function(data){
//					window.plugins.spinnerDialog.hide();
						SD.message.showMessage('Something went wromg grabbing your data', 'bad');
					},
					success: function(data){
//						return data;
//					window.plugins.spinnerDialog.hide();
						myself.$el.html(myself.template(data));
						SD.setTitle('Sex History');

						//Init slider
						$('.history .royalSlider').royalSlider({ //Set up slider
							controlNavigationSpacing: 10,
							controlNavigation: 'bullets',
							arrowsNav: false,
							keyboardNavEnabled: true,
							navigateByClick: false,
							block: {
								delay: 400
							}
						});
					}
				});
		},
	});
	return history;
});