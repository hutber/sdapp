define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var pin = SD.defaultView.extend({
		el: 'page',
		events: {
			'click .checkpin .digit': 'checkdigit',
		},
		currentPw: "",
		template: JST['app/www/js/templates/users/pin.ejs'],
		render: function () {

			var data = {
				text: "Please enter your <span>4-digit passcode</span> to log in ",
				target: 'checkpin'
			};

			this.$el.html(this.template(data));
			SD.setTitle('Log In');
		},
		checkdigit: function(el){
			var myself = this,
				valueReturned = el.currentTarget.innerHTML,
				pins = $('.pininputs'),
				pinInputs = $('.pininputs > div'),
				actives = pins.find('.active');

			if(isNumber(valueReturned)){
				pinInputs.eq(actives.length).addClass('active');
				myself.currentPw += ''+valueReturned;
				if(myself.currentPw.length === 4 && myself.currentPw === localStorage.pinNumber){
					sessionStorage.removeItem('appOpenedFirstTime');
					window.location.href = "#home";
				}else if (myself.currentPw.length === 4){
					SD.message.showMessage('Pin incorrect', 'bad', 1000);
				}
			}else{
				if(valueReturned === "Forgot Pin?"){
					//Forward to forgotten
				}else if (valueReturned === ""){
					myself.currentPw = myself.currentPw.substr(0, actives.length-1);
					pinInputs.eq(actives.length-1).removeClass('active');
				}
			}
		}
	});
	return pin;
});