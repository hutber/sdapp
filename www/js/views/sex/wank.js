define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'dsv'
], function ($, _, Backbone, JST) {
    'use strict';

	//set up homeview
    var wank = SD.defaultSexView.extend({
		events: {
			"click sexform.blocks > *" : 'openASex',
			"click save" : 'openASex',
		},
		render: function () {

			//Give the non-default values
			var data = this.dataChecker({
				sextype: 'wank',
			});

			//Update the current sex
			SD.CURRENTSEX = 'wank';

			SD.DSV.render(data);

			//Set the page's title
			SD.setTitle('Selfie!!');
        }
    });
    return wank;
});