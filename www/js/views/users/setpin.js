define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var setpin = SD.defaultView.extend({
		el: 'page',
		events: {
			'click .setpin .digit': 'checkdigit',
		},
		currentPw: "",
		template: JST['app/www/js/templates/users/pin.ejs'],
		render: function () {

			var data = {
				text: "Please enter your desired <span>4-digit passcode.</span>",
				target: 'setpin'
			};

			this.$el.html(this.template(data));
			SD.setTitle('Please set a pin');
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
				if(myself.currentPw.length === 4){
					sessionStorage.setItem('tmpPin',myself.currentPw);
					window.location.href = "#confirmpin";
				}
			}else{
				if(valueReturned === "Forgot Pin?"){
					//Forward to forgotten
					if(confirm('Are you sure you have forgotten your pin code? Doing this will reset your pin and log you out')){
						localStorage.clear();
						document.location.replace('');
					}
				}else if (valueReturned === ""){
					myself.currentPw = myself.currentPw.substr(0, actives.length-1);
					pinInputs.eq(actives.length-1).removeClass('active');
				}
			}
		}
	});
	return setpin;
});