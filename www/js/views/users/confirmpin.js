define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var confirmpin = SD.defaultView.extend({
		el: 'page',
		events: {
			'click .confirmpin .digit': 'checkdigit',
		},
		currentPw: "",
		template: JST['templates/users/pin.ejs'],
		render: function () {

			var data = {
				text: "Please <span>Confirm</span> your <span>4-digit passcode</span> to save your pin",
				target: 'confirmpin'
			};

			this.$el.html(this.template(data));
			SD.setTitle('Confirm Pin');
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
				if(myself.currentPw.length === 4 && myself.currentPw === sessionStorage.tmpPin){
					sessionStorage.removeItem('tmpPin');
					localStorage.setItem('pinNumber',myself.currentPw);
					sessionStorage.removeItem('appOpenedFirstTime');
					window.location.href = "#pinsave";
				}else if(myself.currentPw.length === 4){
					SD.message.showMessage('Sorry, your pins do not match', 'bad', 750);
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
	return confirmpin;
});