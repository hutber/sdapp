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
		render: function () {
			var data = this.dataChecker({
				sextype: 'anything',
			});

			//Update the current sex
			SD.CURRENTSEX = 'anything';

			SD.DSV.render(data);

			SD.setTitle('Good lord really? That?!!!');
		}
	});
	return anything;
});