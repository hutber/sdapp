define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';
	//set up homeview
	var oral = SD.defaultView.extend({
		el: 'page',
		jstemplate: JST['app/www/js/templates/sex.ejs'],
		data: {
			header: "Can't talk mouth full!!!",
			image: '/img/path.jpg'
		},
		render: function () {
			var compiled = this.jstemplate(this.data);
			this.$el.html(compiled);
		}
	});
	return oral;
});