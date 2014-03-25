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