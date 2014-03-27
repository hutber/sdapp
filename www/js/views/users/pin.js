define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var pin = SD.defaultView.extend({
		el: 'page',
		events: {
			'submit #pin': 'checkPin',
		},
		template: JST['app/www/js/templates/users/pin.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Log In');
		},
		checkPin: function(input){
			//Now remove marker of 'safely' logged in
			if(input.currentTarget[0].value === localStorage.pinNumber){
				sessionStorage.removeItem('appOpenedFirstTime');
				window.location.href = "#home";
			}else{
				SD.message.showMessage('Pin incorrect', 'bad');
			}
			return false;
		}
	});
	return pin;
});