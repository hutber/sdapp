define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd',
	'dsv',
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

			SD.setTitle('Fingers or Hands!');
		}
	});
	return hands;
});