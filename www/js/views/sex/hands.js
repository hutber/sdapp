define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var hands = SD.defaultSexView.extend({
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'hands',
			image: '/img/path.jpg'
		},
		render: function () {
			SD.DSV.renderSex(SD.DSV.ownView(this.data));
			SD.setTitle('Somebody has nicely lent you their hands.');
		}
	});
	return hands;
});