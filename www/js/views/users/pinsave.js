define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var pin = SD.defaultView.extend({
		el: 'page',
		template: JST['app/www/js/templates/users/pinsave.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Pin Saved');
		},
	});
	return pin;
});