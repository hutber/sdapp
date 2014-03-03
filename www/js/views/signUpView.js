/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd.functions',
	'dv',
	'forms'
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var SignUpView = SD.defaultView.extend({
		el: 'page',

        template: JST['app/www/js/templates/login/signup.ejs'],

        render: function () {
            this.$el.html(this.template);
			this.globalClass();

			$('.signupForm').forms({required: 'all'});

			//Time date picker
			$('#dob').mobiscroll({
				preset: 'date',
				dateFormat: 'yy-mm-dd',
				maxDate: new Date(),
				defaultValue: new Date(1990,1,1),
				headerText: 'Date of Birth',
				ampm: false,
				dateOrder: 'dd mm yy',
				onSelect: function(el) {
					$('#dob').html(el).removeAttr('class');
				},
			});
        },
        events: {
            'submit .signupForm': 'signupForm'
        },
		signupForm: function (elem) {
			if($(elem.currentTarget).find('.error').length !== true){
				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				$.ajax({
					url: SD.AJAX+'users/reg',
					type: 'POST',
					dataType: 'json',
					data: values,
					error: function(data){
						SD.overlay.hideme();
						SD.message.showMessage('Shit man! The registration failed. Please try again?!... - '+data.bad, 'bad');
					},
					success: function(data){
						c(data);
						//TODO display the error
						if(data.error){
							SD.overlay.hideme();
							SD.message.showMessage(data.error, 'bad');
						}else{
							SD.overlay.hideme();
							SD.message.showMessage(data.good);
							$('.btn.signup').attr('disabled','disabled');
						}
					}
				});
			}
            return false;
        }
    });
    return SignUpView;
});