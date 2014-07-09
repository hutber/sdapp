define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
			'click delete':'deleteUser',
			'click resetpin':'resetpin'
		},
		template: JST['templates/users/settings.ejs'],
		resetpin: function(){
			SD.UI.Dialog('Reset your pincode?', 'Are you sure you wish to reset your 4 digit pincode?', ['Cancel', 'Yes, reset pincode'], function(){
				localStorage.removeItem('pinNumber');
				//This checker will active when the app is closed, on repoen this gets set and user has to enter their pin number
				sessionStorage.setItem('appOpenedFirstTime',true);
				document.location.replace('#setpin');
			}, 'confirm');
		},
		deleteUser: function(){
			SD.UI.Dialog('Delete Account?', 'Now did you mean to click me? Or did u just mess up?', ['Get me out of here, cancel', 'Yes'], function(){
				SD.UI.Dialog('Delete Account?', 'Ok, cool. Now I just need to check again, because you can only delete this once. Its permanent, none of that google crap with undo', ['Cancel', 'Remove me from all services forever!!'], function(){
					SD.spinner.showme();
					$.ajax({
						url: SD.AJAX+'users/deleteUser',
						type: 'POST',
						dataType: 'json',
						data: {
							'sess': localStorage.privateKey,
						},
						error: function(data){
							localStorage.clear();
							sessionStorage.clear();
							document.location.replace('');
						},
						success: function(data){
							SD.message.showMessage('Opps, didn\'t work did it', 'bad');
							SD.spinner.hideme();
						}
					});
				}, 'confirm');
			}, 'confirm');
		},
		render: function () {

			var data = {
				gender: function(){
					if(localStorage.gender==="0"){
						return "male";
					}else{
						return "female";
					}
				}(),
				regdate: localStorage.regdate
			};

			this.$el.html(this.template(data));
			SD.setTitle('My Settings');
		},
	});
	return profile;
});