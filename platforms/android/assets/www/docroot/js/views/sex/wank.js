define([
    'jquery',
    'underscore',
    'backbone',
    '../../../dist/js/templates',
	'../../sd.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

	//set up homeview
    var wank = SD.defaultView.extend({
        el: 'page',

        template: JST['platforms/android/assets/www/docroot/js/templates/sex/wank.ejs'],

        render: function () {
            this.$el.html(this.template);
        }
    });
    return wank;
});