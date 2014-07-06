/*
 ==================================================
 Table of Contents - Created by Hutber on 17/05/14.
 ==================================================
 */
define([
], function () {

	SD.UI = {};

	/*==================================================
	Display functions
	================================================== */
	//#Update title
	SD.setTitle = function(title){
		$('.title').html(title);
	};

	//#display the popup/overlay ------------------------------------------------------
	SD.overlay = {
		init: function(elem) {
			SD.centerItems(elem);
		},
		showme: function(){
			$('overlay').addClass('display');
		},
		hideme: function(){
			$('overlay').removeClass('display');
		}
	};
	/*==================================================
	Dialogs
	================================================== */
	SD.UI.Dialog = function(title, message, button, callback, type){
		if(typeof type === "undefined"){
			type = 'alert';
		}
		if(typeof navigator.notification !== "undefined"){
			navigator.notification[type](message, function(button){
				if(button===2){
					callback();
				}
			}, title, button);
		}else{
			if(type === "alert"){
				alert(title + ' '+ message);
			}else if (type === "confirm"){
				if(confirm(title + ' '+ message)){
					callback();
				}
			}
		}
	};

	/*==================================================
	Loading
	================================================== */
	SD.spinner = {
		timer: null,
		icon: $('overlay .icon-cancel-circled'),
		show: function(title, message, timer){
			if(typeof title!=="string"){
				title = null;
			}
			if(typeof message!=="string"){
				message = null;
			}
			if(timer){
				SD.spinner.timer = window.setTimeout(SD.spinner.displayCloseButton , 5000);
			}
//			if(window && window.plugins && window.plugins.spinnerDialog){
//				window.plugins.spinnerDialog.show(title,message);
//			}else{
				SD.overlay.showme(); //display in branding sex diaries loading
//			}
		},
		hide: function(){
			SD.spinner.icon.hide();
			window.clearTimeout(SD.spinner.timer);
//			if(window && window.plugins && window.plugins.spinnerDialog){
//				window.plugins.spinnerDialog.hide();
//				SD.overlay.hideme();
//			}else{
				SD.overlay.hideme();
//			}
		},
		displayCloseButton: function(){
			SD.spinner.icon.fadeIn();
		}
	};

	//update details on page load
	SD.pageLoad = function(pageToLoad){
		var useme;

		//Simple check if we have been given a string
		if(typeof pageToLoad === "string"){
			useme = pageToLoad;
		}else if(document.location.hash){
			useme = SD.HASH;
		}else{
//			c('Nothing was given in the pageLoad');
		}

		//Update the current view, don't re-redner it
		SD.ROUTER.navigate(useme, true);
	};

	SD.message = {
		timer: null,
		showMessage: function(message, type, duration){
			if(typeof duration === "undefined") duration = 5000;
			$('messageBox message').find('div').html(message);
			$('messageBox').removeAttr('class').attr('class',type+' show');
			this.timer = setTimeout(this.hideMessage, duration);
		},
		hideMessage: function(){
			$('messageBox').removeClass('show');
			clearTimeout(this.timer);
		}
	};

	//set up click event to hide
	$('messageBox').on('click', SD.message.hideMessage);

	/*==================================================
	Formatting Results
	================================================== */
	//#SEXNUMBERS ------------------------------------------------------
	SD.format = {
		toString: function(sex){
			var val = 'Anything';
			switch (sex) {
				case (1):
					val = 'Wank';
					break;
				case (2):
					val = 'Hands';
					break;
				case (3):
					val = 'Oral';
					break;
				case (4):
					val = 'Sex';
					break;
				case (5):
					val = 'Anything';
					break;
			}
			return val;
		},
		convertToLocal: function(item, target){
			if(typeof item !=="undefined"){
				JSON.parse(item).forEach(function(me){
					if(typeof me==="object"){
						var sexName = me.sexType,
							sexNumber = +me.no;

						switch (sexName){
							case "1":
								target.Wank = sexNumber;
								break;
							case "2":
								target.Hands = sexNumber;
								break;
							case "3":
								target.Oral = sexNumber;
								break;
							case "4":
								target.Sex = sexNumber;
								break;
							case "5":
								target.Anything = sexNumber;
								break;
						}
					}else{
						target.total = me;
					}
				});
			}
		}
	};

	SD.changeHeightofContent = function(){
		if($('footer').is(':visible')){
			SD.pageHeight = $('body').outerHeight() - ($('header').outerHeight() + $('footer').outerHeight());
		}else{
			SD.pageHeight = $('body').outerHeight() - ($('header').outerHeight());
		}
		$('page').css({height:SD.pageHeight});
	};

	return SD;
});