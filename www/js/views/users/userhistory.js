define([
	'sd',
	'dsv',
], function (SD) {
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
			SD.buildSexNumbers.init();

			//Reaplce title with wanted text
			SD.setTitle('Sex History');

			if(Object.keys(SD.FULLSEX).length){
				// #Rewrite HTML on page with tempalte
				myself.$el.html(myself.templateMenu(SD.FULLSEX));

				// #Update the page with individual data from AJAX
				for(var key in SD.FULLSEX) break; //Ggrab out the first item from object
				$('.historyContent').html(myself.template(SD.FULLSEX[key]));

				//bind menu change all the way at the top :( page
				$('page').on('change', '#category', function(selection){
					// #Update the page with individual data from AJAX
					$('.historyContent').html(myself.template(SD.FULLSEX[selection.currentTarget.value]));
				});

				//bind menu change all the way at the top :( page
				$('page').on('change', '#month', function(selection){
					// #Update the page with individual data from AJAX
					$('.historyContent').html(myself.template(SD.FULLSEX[selection.currentTarget.value]));
				});
			}else{
				// #Rewrite HTML on page with tempalte
				myself.$el.html(myself.templateMenu());
			}
		}
	});
	return history;
});