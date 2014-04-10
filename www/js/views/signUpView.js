/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd',
	'dv',
	'forms'
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var SignUpView = SD.defaultView.extend({
		el: 'page',

        template: JST['app/www/js/templates/login/signup.ejs'],
        checkmail: JST['app/www/js/templates/login/checkmail.ejs'],
		terms: JST['app/www/js/templates/login/terms.ejs'],

        render: function () {
            this.$el.html(this.template);

			$('.signupForm').forms({required: 'all'});

			//add terms into the template.
			$('#terms').html(this.terms);

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
//			this.$el.html(this.checkmail({email:'aasdas'}));
        },
        events: {
            'submit .signupForm': 'signupForm',
            'click .elements label a': 'termsPop',
            'click .icon-left-big': 'termsPopClose',
        },
		termsPop: function(el){
			$('.signupForm').hide();
			$('#terms').show();
		},
		termsPopClose: function(){
			$('.signupForm').show();
			$('#terms').hide();
		},
		signupForm: function (elem) {
			var myself = this;
			if($(elem.currentTarget).find('.error').length !== true){
				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				//Turn off signup button
				$('.btn.signup').attr('disabled','disabled');
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
						//TODO display the error
						if(data.error){
							SD.overlay.hideme();
							SD.message.showMessage(data.error, 'bad');
							$('.btn.signup').removeAttr('disabled');
						}else{
							SD.overlay.hideme();
							SD.message.showMessage(data.good);
							myself.$el.html(myself.checkmail({email:values.email}));
						}
					}
				});
			}
            return false;
        }
    });
    return SignUpView;
});