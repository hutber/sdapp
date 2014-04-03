define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd',
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

			var data = {
				gender: localStorage.gender,
				regdate: localStorage.regdate
			}

			this.$el.html(this.template(data));
			SD.setTitle('My Settings');
		},
	});
	return profile;
});