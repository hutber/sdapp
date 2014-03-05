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
	var privacy = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/other/privacy.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Privacy');
		},
	});
	return privacy;
});