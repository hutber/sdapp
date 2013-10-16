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
		data: {
			header: 'MOTHER FUCKING WANK!!!',
			image: '/img/path.jpg'
		},
        render: function () {
			c(this.template());
//			var compiled = _.template("hello: <%= header %>");
//			this.$el.html(compiled(this.data));
        }
    });
    return wank;
});