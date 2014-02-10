define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dv'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	var myself;

	//set up homeview
	var whoAdd = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/details/whoAdd.ejs'],
		render: function () {
			myself = this;
			this.$el.html(this.template);
			SD.setTitle('Who was involved?');
		}
	});
	return whoAdd;
});