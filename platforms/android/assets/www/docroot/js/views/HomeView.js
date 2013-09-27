define([
    'jquery',
    'underscore',
    'backbone',
    '../../dist/js/templates',
	'../core.functions',
	'../sd.functions'
], function ($, _, Backbone, JST, core, SD) {
    'use strict';

	//set up homeview
    var HomeView = SD.defaultView.extend({
		el: 'page',
        template: JST[
			'platforms/android/assets/www/docroot/js/templates/home.ejs'
		],
		events:{
			"click acts a" : 'changeSex'
		},
        render: function () {
            this.$el.html(this.template);
        },
		changeSex: function(elem){
			Backbone.history.loadUrl(elem.currentTarget.id);
		}
    });
    return HomeView;
});