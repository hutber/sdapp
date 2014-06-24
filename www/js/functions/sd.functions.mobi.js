/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
	'mobiscroll',
	'mobiscrollScroller',
	'mobiscrollDate',
], function () {

//	//Time date picker
//	$('when').mobiscroll({
//		preset: 'datetime',
//		dateFormat: 'DD d M yy',
//		timeFormat: 'H:ii',
//		maxDate: new Date(),
//		ampm: false,
////						height: SD.pageHeight/20,
//		dateOrder: 'dMyy',
//		onSelect: function(el) {
//			$('when date').html(el);
//			SD.SEXDEFAULTS.sextime[0] = el,
//				SD.SEXDEFAULTS.sextime[1] = currentDatePicker.values;
//		}
//	});
//	//set the current date instance
//	var currentDatePicker = $('when').mobiscroll('getInst');
//
////					Update sextime to have the current version of the date picker
//	SD.SEXDEFAULTS.sextime[0] = currentDatePicker;
//
////					Update current instance to the old value of the date if it exists
//	if(SD.SEXDEFAULTS.sextime[1]){
//		if(SD.SEXDEFAULTS.edit && typeof SD.SEXDEFAULTS.sextime[1][0] === "string" && typeof SD.SEXDEFAULTS.sextime[1][1] === "string" && typeof SD.SEXDEFAULTS.sextime[1][2] === "string" && typeof SD.SEXDEFAULTS.sextime[1][3] === "string" && typeof SD.SEXDEFAULTS.sextime[1][4] === "string"){
//			(function(item){
//				item[1]--;
//				currentDatePicker.setValue(item);
//			})(SD.SEXDEFAULTS.sextime[1].slice(0));
//		}
//		else {
//			currentDatePicker.setValue(SD.SEXDEFAULTS.sextime[1]);
//		}
//	}else{
//		SD.SEXDEFAULTS.sextime[1] = currentDatePicker.values;
//	}
//	//On page load update the date string
//	$('when date').html(currentDatePicker.val);
	function createMobile (){
		var myself = this;
		this.selector = null,
		this.target = null;

		this.init = function(){
			myself.setUp();
			myself.theRest();
		};

		this.setUp = function(){
			this.selector = $(this.target);
			if(typeof this.selector.mobiscroll()[myself.target] !== "undefined"){
				myself.inst = this.selector.mobiscroll()[myself.target](myself.settings).mobiscroll('getInst');
			}else{
				myself.inst = this.selector.mobiscroll(myself.settings).mobiscroll('getInst');
			}
		};

		this.theRest = function(){
			//Update sextime to have the current version of the date picker
			SD.SEXDEFAULTS[myself.target][0] = myself.inst;

			//Update current instance to the old value of the date if it exists
			if(SD.SEXDEFAULTS[myself.target][1]){
				if(SD.SEXDEFAULTS.edit && typeof SD.SEXDEFAULTS[myself.target][1][0] === "string" && typeof SD.SEXDEFAULTS[myself.target][1][1] === "string" && typeof SD.SEXDEFAULTS[myself.target][1][2] === "string" && typeof SD.SEXDEFAULTS[myself.target][1][3] === "string" && typeof SD.SEXDEFAULTS[myself.target][1][4] === "string"){
					(function(item){
						item[1]--;
						myself.inst.setValue(item);
					})(SD.SEXDEFAULTS[myself.target][1].slice(0));
				}
				else {
					myself.inst.setValue(SD.SEXDEFAULTS[myself.target][1]);
				}
			}else{
				SD.SEXDEFAULTS[myself.target][1] = myself.inst.values;
			}
			//On page load update the date string
			$(myself.target).find('date').html(myself.inst.val);
		};
	}
	return createMobile;
});