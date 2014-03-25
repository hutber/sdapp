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
	var managewhos = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/managewhos.ejs'],
		render: function () {
			var myself = this;
			SD.setTitle('Your Who\'s');
			SD.spinner.show();

			$.ajax({
				url: SD.AJAX+'users/myWhos',
				dataType: "json",
				data: {
					'code': sessionStorage.privateKey,
				},
				error: function(data){
					SD.spinner.hide();
					SD.message.showMessage('Something went wromg grabbing your data', 'bad');
				},
				success: function(data){
					// #Rewrite HTML on page with tempalte
					myself.$el.html(myself.template(data));

					//Remove loading
					SD.spinner.hide();

				}
			});
		},
	});
	return managewhos;
});