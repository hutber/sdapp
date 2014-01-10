define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var oral = SD.defaultSexView.extend({
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'oral',
			image: '/img/path.jpg'
		},
		render: function () {
			SD.DSV.renderSex(SD.DSV.ownView(this.data));
			SD.setTitle("Can't talk mouth full!!!");
		}
	});
	return oral;
});