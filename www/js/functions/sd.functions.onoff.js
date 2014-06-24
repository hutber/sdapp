/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
	'hammerjs',
], function (Hammer) {
	'use strict';

	SD.onoff = {
		instances:{}
	};

	SD.onoff.create = function(el){
		var myself = this,
		slider = el.find('span'),
		sliderName = el.data('name'),
		sliderWidth = el.width(),
		sliderHalf = sliderWidth / 2,
		sliderBreakPoint = sliderWidth/4,
		sliderCurrentPos = parseInt(slider[0].style.webkitTransform.slice(12,15)),
		sliderCurrentState = 'nothing',
		sliderAmount = 0; //default middle position

		var hammerOptions = {
//				dragBlockVertical: true,
//				dragLockToAxis: true
		};

		//setup slides
		var sliderThing = Hammer(slider[0], hammerOptions);

		sliderThing.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL}));
		sliderThing.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL}));

		sliderThing.on("pan panend", function(ev) { myself.onPan(ev); });

//		myself.checkPrevious();

		this.onPan = function (ev){
			sliderCurrentPos = parseInt(slider[0].style.webkitTransform.slice(12,16));
			sliderAmount = ev.deltaX;

			switch(ev.direction) {
				case 4: //Off
					if(sliderCurrentState === "off"){
						sliderAmount = sliderHalf+ev.deltaX;
					}else if(sliderCurrentState === "on"){
						sliderAmount = ev.deltaX-sliderHalf;
					}
					myself.setelOffset(sliderAmount); //minus the width of the slider so it fits inside the box
					break;
				case 2: //On
					if(sliderCurrentState === "off"){
						sliderAmount = ev.deltaX+sliderHalf;
					}else if(sliderCurrentState === "on"){
						sliderAmount = ev.deltaX-sliderHalf;
					}
					myself.setelOffset(sliderAmount);
					break;
			}

			if(ev.type === 'panend'){
				el.find('input').remove();
				if(sliderCurrentPos > sliderBreakPoint){
					myself.setelOffset(sliderHalf, true);
					sliderCurrentState = 'off';
					SD.SEXDEFAULTS.extra[sliderName] = sliderCurrentState;
				}else if(sliderCurrentPos < -sliderBreakPoint){
					myself.setelOffset(-sliderHalf, true);
					sliderCurrentState = 'on';
					SD.SEXDEFAULTS.extra[sliderName] = sliderCurrentState;
				}else{
					sliderCurrentState = 'nothing';
					delete SD.SEXDEFAULTS.extra[sliderName];
					myself.setelOffset(0, true);
				}
				el.removeAttr('class').addClass('entry').addClass(sliderCurrentState);
			}
		};

		this.setelOffset = function(num, animate, force) {
			slider.removeClass("animate");

			if(animate) {
				slider.addClass("animate");
			}

			if(num < sliderHalf && num > -sliderHalf || animate || force){
				if(Modernizr.csstransforms3d) {
					slider.css("transform", "translate3d("+ num +"px,0,0) scale3d(1,1,1)");
				}
				else if(Modernizr.csstransforms) {
					slider.css("transform", "translate("+ num +"px,0)");
				}
				else {
					slider.css("left", num*2+"px");
				}
			}
		};

		this.checkPrevious = function (){
			if(SD.SEXDEFAULTS.extra[sliderName]){
				if(SD.SEXDEFAULTS.extra[sliderName]==="off"){
					sliderCurrentState = 'off';
					myself.setelOffset(sliderHalf, false, true);
				}else if (SD.SEXDEFAULTS.extra[sliderName]==="on"){
					sliderCurrentState = 'on';
					myself.setelOffset(-sliderHalf, false, true);
				}
				el.removeAttr('class').addClass('entry').addClass(sliderCurrentState);
			}
		};
	};

	return SD.onoff.create;
});