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
		template: JST['app/www/js/templates/users/setpin.ejs'],
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
				c(myself.currentPw.length);
				if(myself.currentPw.length === 4){
					sessionStorage.setItem('tmpPin',myself.currentPw);
					window.location.href = "#confirmpin";
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
	return setpin;
});