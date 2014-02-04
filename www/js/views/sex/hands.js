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
		render: function () {
			var data = this.dataChecker({
				sextype: 'hands',
			});

			//Update the current sex
			SD.CURRENTSEX = 'hands';

			SD.DSV.render(data);

			SD.setTitle('Somebody has nicely lent you their hands.');
		}
	});
	return hands;
});