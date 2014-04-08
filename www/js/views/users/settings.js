define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd',
	'dsv',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
			'click delete':'deleteUser'
		},
		template: JST['app/www/js/templates/users/settings.ejs'],
		deleteUser: function(){

			if(confirm('Now did you mean to click me? Or did u just fuck up?')){
				if(confirm('Ok, cool. Now I just need to check again, because you can only delete this once. Its preminent, none of that google shit with undo')){
					SD.overlay.showme();
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
							SD.overlay.hideme();
						}
					});
				}
			}
		},
		render: function () {

			var data = {
				gender: localStorage.gender,
				regdate: localStorage.regdate
			}

			this.$el.html(this.template(data));
			SD.setTitle('My Settings');
		},
	});
	return profile;
});