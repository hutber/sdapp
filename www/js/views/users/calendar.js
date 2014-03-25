define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';

	//set up homeview
	var calendar = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/calendar.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Sex Calendar');
		},
	});
	return calendar;
});