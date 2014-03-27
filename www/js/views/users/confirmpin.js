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
		template: JST['app/www/js/templates/users/setpin.ejs'],
		render: function () {

			var data = {
				text: "Please <span>Confirm</span> your <span>4-digit passcode</span> to save your pin",
				target: 'confirmpin'
			};

			this.$el.html(this.template(data));
			SD.setTitle('Please set a pin');
		},
		checkdigit: function(el){
			var myself = this,
			valueReturned = null,
			pins = $('.pininputs'),
			pinInputs = $('.pininputs > div'),
			actives = pins.find('.active');

			switch (el.currentTarget.innerHTML){
				case "1":
					valueReturned = 1;
				break;
				case "2":
					valueReturned = 2;
				break;
				case "3":
					valueReturned = 3;
				break;
				case "4":
					valueReturned = 4;
				break;
				case "5":
					valueReturned = 5;
				break;
				case "6":
					valueReturned = 6;
				break;
				case "7":
					valueReturned = 7;
				break;
				case "8":
					valueReturned = 8;
				break;
				case "9":
					valueReturned = 9;
				break;
				case "0":
					valueReturned = 0;
				break;
				case "Forgot Pin?":
					valueReturned = "forgotten";
				break;
				case "":
					valueReturned = "del";
				break;
			}

			if(typeof valueReturned !== "string"){
				pinInputs.eq(actives.length).addClass('active');
				myself.currentPw += ''+valueReturned;
				if(myself.currentPw.length === 4 && myself.currentPw === sessionStorage.tmpPin){
					sessionStorage.removeItem('tmpPin');
					localStorage.setItem('pinNumber',myself.currentPw);
					sessionStorage.removeItem('appOpenedFirstTime');
					window.location.href = "#pinsave";
				}else if(myself.currentPw.length === 4){
					SD.message.showMessage('Sorry, your pins do not match', 'bad');
				}
			}else{
				if(valueReturned === "Forgot Pin?"){
					//Forward to forgotten
				}else if (valueReturned === "del"){
					pinInputs.eq(actives.length-1).removeClass('active');
				}
			}
		}
	});
	return confirmpin;
});