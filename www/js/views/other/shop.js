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
	var managewhos = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/other/shop.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Our Shop');
		},
	});
	return managewhos;
});