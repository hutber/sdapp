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
    var wank = SD.defaultView.extend({
        el: 'page',
        template: JST['app/www/js/templates/sex.ejs'],
		information: {
			header: 'MOTHER FUCKING WANK!!!',
			image: '/img/path.jpg'
		},
        render: function () {
			var infom = _.template(this.template(), this.information);
			this.$el.html(infom);
        }
    });
    return wank;
});