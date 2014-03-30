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

			// #Rewrite HTML on page with tempalte
			myself.$el.html(myself.template(JSON.parse(localStorage.whos)));
		},
	});
	return managewhos;
});