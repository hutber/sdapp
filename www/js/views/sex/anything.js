define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var anything = SD.defaultSexView.extend({
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'anything',
			header: 'Good lord really? That?!!!',
			image: '/img/path.jpg'
		},
		render: function () {
			SD.DSV.renderSex(SD.DSV.ownView(this.data));
		}
	});
	return anything;
});