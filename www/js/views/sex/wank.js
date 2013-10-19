define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd.functions',
	'defaultSexView'
], function ($, _, Backbone, JST, SD, SV) {
    'use strict';

	//set up homeview
    var wank = SV.extend({
        el: 'page',
        jstemplate: JST['app/www/js/templates/sex.ejs'],
		data: {
			url: SD.HTTP+'stats/add',
			sextype: 'wank',
			header: 'MOTHER FUCKING WANK!!!',
			image: '/img/path.jpg'
		},
        render: function () {
			var compiled = this.jstemplate(this.data);
			this.$el.html(compiled);
        }
    });
    return wank;
});