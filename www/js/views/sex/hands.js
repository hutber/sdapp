define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';
	//set up homeview
	var hands = SD.defaultView.extend({
		el: 'page',
		jstemplate: JST['app/www/js/templates/sex.ejs'],
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'hands',
			header: 'Somebody has nicely lent you their hands.',
			image: '/img/path.jpg'
		},
		render: function () {
			var compiled = this.jstemplate(this.data);
			this.$el.html(compiled);
			$(this.data.sextype).addClass('selected');
		}
	});
	return hands;
});