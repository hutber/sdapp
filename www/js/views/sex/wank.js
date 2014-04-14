define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd',
	'dsv'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var wank = SD.defaultSexView.extend({
		events: {
			"click sexform.blocks > *" : 'openASex',
		},
		render: function () {

			//Give the non-default values
			var data = this.dataChecker({
				sextype: 'wank',
			});

			//Update the current sex
			SD.CURRENTSEX = 'wank';

			SD.DSV.render(data);

			//Hide who for wank
			$('who').hide();

			//Set the page's title
			SD.setTitle('MOTHER FUCKING WANK!!!');
        }
    });
    return wank;
});