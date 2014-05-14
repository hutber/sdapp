/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd',
	'dv',
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var ForgottenView = SD.defaultView.extend({
		el: 'page',

        template: JST['templates/login/forgotten.ejs'],

        render: function () {
            this.$el.html(this.template);
			$('#forgotten').forms({required: 'all'});
        },

        events: {
            'submit #forgotten': 'forgotten',
        },

		forgotten: function (elem) {
			if($(elem.currentTarget).find('.error').length !== true){
				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				$.ajax({
					url: SD.AJAX+'users/forgotten',
					type: 'POST',
					dataType: 'json',
					data: {
						'email': values.email,
					},
					error: function(data){
						SD.message.showMessage('Sorry, there is an error on the server. Please report this bug. Email is below', 'bad');
						SD.overlay.hideme();
					},
					success: function(data){
						SD.overlay.hideme();
						if(data.good){
							SD.message.showMessage(data.good);
						}else{
							SD.message.showMessage(data.bad, 'bad');
						}
					}
				});
			}
			return false;
        }
    });
    return ForgottenView;
});