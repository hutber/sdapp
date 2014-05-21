define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var oral = SD.defaultSexView.extend({
		render: function () {
			var data = this.dataChecker({
				sextype: 'oral',
			});

			//Update the current sex
			SD.CURRENTSEX = 'oral';

			SD.DSV.render(data);

			SD.setTitle("Can't talk mouth full!!!");
		}
	});
	return oral;
});