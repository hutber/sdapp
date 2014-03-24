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

			$.ajax({
				url: SD.AJAX+'users/myWhos',
				dataType: "json",
				data: {
					'code': sessionStorage.privateKey,
				},
				error: function(data){
					//window.plugins.spinnerDialog.hide();
					SD.overlay.hideme();
					SD.message.showMessage('Something went wromg grabbing your data', 'bad');
				},
				success: function(data){
					// #Rewrite HTML on page with tempalte
					myself.$el.html(myself.template(data));

					//Remove loading
					SD.overlay.hideme();

				}
			});

			//Add click event for the plus
			$('html').on('click', '.managewhos add', function(){
				SD.pageLoad('whoadd');
			});
		},
	});
	return managewhos;
});