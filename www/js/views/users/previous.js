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
	var previous = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/previous.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('previous');
		},
	});
	return previous;
});