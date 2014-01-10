define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var sex = SD.defaultSexView.extend({
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'sex',
			image: '/img/path.jpg'
		},
		render: function () {
			SD.DSV.renderSex(SD.DSV.ownView(this.data));
			SD.setTitle('Argh yeee...  ...   sex  ... yeeee');
		}
	});
	return sex;
});