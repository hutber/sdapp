define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var extra = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['templates/extra/extra.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Extra Info');
		},
	});
	return extra;
});