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
		templateMenu: JST['app/www/js/templates/users/historyMenu.ejs'],
		templateFull: JST['app/www/js/templates/users/historyFull.ejs'],
		template: JST['app/www/js/templates/users/history.ejs'],
		render: function () {
			var myself = this;
			SD.convertSexNumbers.init();
			//window.plugins.spinnerDialog.show("Sex History","Loading your sex history... Please Wait...");
			$.ajax({
				url: SD.AJAX+'sex/grabfullsex',
				dataType: "json",
				data: {
					'code': sessionStorage.privateKey,
				},
				error: function(data){
				//window.plugins.spinnerDialog.hide();
					SD.message.showMessage('Something went wromg grabbing your data', 'bad');
				},
				success: function(data){
					SD.FULLSEX = data;

					// #Rewrite HTML on page with tempalte
					myself.$el.html(myself.templateMenu(data));

					// #Update the page with individual data from AJAX
					for(var key in data) break; //Ggrab out the first item from object
					$('.historyContent').html(myself.template(data[key]));

//					c(Object.keys(data).keepValue('Mar'));

					//bind menu change all the way at the top :( page
					$('page').on('change', '#category', function(selection){
						// #Update the page with individual data from AJAX
						c(data)
						c(SD.FULLSEX[selection.currentTarget.value]);
						$('.historyContent').html(myself.template(SD.FULLSEX[selection.currentTarget.value]));
					});

					//bind menu change all the way at the top :( page
					$('page').on('change', '#month', function(selection){
						// #Update the page with individual data from AJAX
						$('.historyContent').html(myself.template(data[selection.currentTarget.value]));
					});

					//Reaplce title with wanted text
					SD.setTitle('Sex History');

				}
			});
		}
	});
	return history;
});