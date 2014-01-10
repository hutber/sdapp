define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var wank = SD.defaultSexView.extend({
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'wank',
			image: '/img/path.jpg'
		},
        render: function () {
			SD.DSV.renderSex(SD.DSV.ownView(this.data));
			SD.setTitle('MOTHER FUCKING WANK!!!');
        }
    });
    return wank;
});