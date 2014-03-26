define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';

	//set up homeview
	var managewhos = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/managewhos.ejs'],
		render: function () {
			var myself = this;
			SD.setTitle('Your Sexy Partners');
			SD.spinner.show();

			$.ajax({
				url: SD.AJAX+'users/myWhos',
				dataType: "json",
				data: {
					'code': localStorage.privateKey,
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