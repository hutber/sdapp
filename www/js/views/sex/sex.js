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
	var sex = SD.defaultSexView.extend({
		render: function () {
			var data = this.dataChecker({
				sextype: 'sex',
			});

			//Update the current sex
			SD.CURRENTSEX = 'sex';

			SD.DSV.render(data);

			SD.setTitle('Argh yeee...  ...');

		}
	});
	return sex;
});