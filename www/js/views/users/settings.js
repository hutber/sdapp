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
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/settings.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('My Settings');
		},
	});
	return profile;
});