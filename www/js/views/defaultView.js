/**
 * Created by Hutber on 04/02/14.
 */
define([
	'hammerjs',
], function (Hammer) {
	'use strict';
// #Set up the Deult router view ------------------------------------------------------
	SD.defaultView = function(){ //Default controller for all views
		var templatesNeeded = function () { //create a var of the template view
			var myself;
			if (SD.STATE) { //Chhek if we are logged in or not then give different templates
				myself = {
					menu: JST['templates/comp/menu.ejs'],
					header: JST['templates/comp/headerIn.ejs'],
					shell: JST['templates/comp/shell.ejs'],
					footer: JST['templates/comp/footerIn.ejs'],
				};
			} else if(SD.TEMPLATE === "footerout"){
				myself = {
					menu: JST['templates/comp/menu.ejs'],
					header: JST['templates/comp/headerOut.ejs'],
					shell: JST['templates/comp/shell.ejs'],
					footer: JST['templates/comp/footerOut.ejs'],
				};

			}
			return myself.menu() + myself.header() + myself.shell() + myself.footer();
		}();

		//extend the view with the default home view
		var HomeView = Backbone.View.extend({
			el: 'body > shell',
			events: { //Add click events for global clicks
				'click logo a': 'goHome',
				'click footer sexnav div' : 'sexNav',
				'click footer saveBox': 'saveBox',
				'click footer savewho': 'saveWho',
				'click #hidepage' : 'openMenu',
				'click menubtn': 'openMenu',
				'click header add': 'openWhoAdd',
			},
			render: function () {
				//Output correct template
				this.$el.html(templatesNeeded);
//				this.slideMenu.init();
			},
			slideMenu: {
				menuItem: document.getElementById('menuslidearea'),
				init: function(){
					var myself = this;
					var hammerOptions = {
						dragBlockVertical: true,
						dragLockToAxis: true
					};

					//setup slides
					var sliderThing = Hammer(myself.menuItem, hammerOptions);
					sliderThing.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL}));


					sliderThing.on("pan panend", function(ev) { myself.moveMenu(ev); });
				},
				moveMenu: function(ev){
					var moveNumber = ev.deltaX;
					this.setelOffset(moveNumber);
				},
				setelOffset: function(num, animate, force) {
					var myself = this;
					$(myself.menuItem).removeClass("animate");

					if(animate) {
						$(myself.menuItem).addClass("animate");
					}

					if(Modernizr.csstransforms3d) {
						$('body').css("transform", "translate3d("+ num +"px,0,0) scale3d(1,1,1)");
						$('#menu').css("transform", "translate3d("+ -num +"px,0,0) scale3d(1,1,1)");
					}
					else if(Modernizr.csstransforms) {
						myself.menuItem.css("transform", "translate("+ num +"px,0)");
					}
					else {
						myself.menuItem.css("left", num*2+"px");
					}
				}
			},
			doLogOut: function(){
				SD.login.doLogOut();
			},
			openMenu: function(){
				if(typeof localStorage.privateKey!=="undefined")
				$('body').removeAttr('style').toggleClass('menuOpen');
			},
			goHome: function(){
				SD.ROUTER.navigate('home', true);
				return false;
			},
			openWhoAdd: function(){
				SD.ROUTER.navigate('whoadd', true);
				return false;
			},
			globalClass: function(){
				//default class
				var desiredClass = 'selector';


				if(window.location.hash !== ''){
					desiredClass = SD.HASH;
				}

				//Add new class to body
				document.body.removeAttribute('class');
				document.body.setAttribute('class',desiredClass); //Update class on body
				//Check, are we from edit? If we are add class of edit, otherwise don't
				if(SD.SEXDEFAULTS.edit && (desiredClass === "wank" || desiredClass === "hands" || desiredClass === "oral" || desiredClass === "sex" || desiredClass === "anything")){
					$('body').addClass('edit');
				}
			},
			sexNav: function(m){
				//make sure no elements have any selected items
				$('sexnav div.selected').removeAttr('class');
				var currentClick = $(m.currentTarget);

//				//First we make sure that the sexnav element is in fact the correct element.
//				//Sometimes we clicked just outside of the element, but still within the sexnav. Causing JS errors
				if(typeof currentClick !== "undefined"){

					//update current sex with the class
					currentClick.addClass('selected');

					//Check to see if the slider is open, if it is lets go to slide
					if($('.royalSlider')[0] && jQuery.fn.royalSlider){
						SD.SLIDER.goTo(currentClick.data('order'));
					}else{
						SD.pageLoad(currentClick.data('type'));
					}
					SD.SEXDEFAULTS.sexnumber = parseInt(currentClick.data('order'))+1; //update which sex number we are on
				}
			},
			saveWho: function(){
				//define Who
				var who = $('#who');

				if(!who.hasClass('error') && who.val().length>2 && !$('saveWho save').hasClass('disabled')){
					SD.spinner.showme('Saving the Partner');
					$.ajax({
						url: SD.AJAX+'details/addwho',
						type: 'POST',
						dataType: "json",
						data: {
							'who': who.val(),
							'privateKey': localStorage.privateKey,
						},
						error: function(data){
							SD.spinner.hideme();
							SD.message.showMessage('A server error occured, please try again >:|', 'bad', 1500);
						},
						success: function(data){
							SD.spinner.hideme();
							if(data[0].id !== ""){
								SD.SEXDEFAULTS.who = [];
								SD.SEXDEFAULTS.who[who.val()] = data[0].id; //Add the current who's to the current Sex details

								//Create new object of the new Who
								var newObjectOfWhos = {
									id:data[0].id,
									who:data[0].who,
									useage:"0",
								};
								//Add it to the current WHO's
								SD.WHO.push(newObjectOfWhos);

								//replace localStorage for development
								localStorage.WHO = JSON.stringify(SD.WHO);

								//lets go back to the sex details page.
								SD.pageLoad(SD.PREVIOUSHASH);
							}else{
								SD.message.showMessage('A server error occured, please try again :(', 'bad', 1500);
							}
						}
					});
				}else{
					//Check if the user has input anything
					if(who.val().length===0){
						SD.message.showMessage('You need to give us a name to add first', 'bad', 1500);
					}else{
						SD.message.showMessage('Pick a name that is new', 'bad', 1500);
					}
				}
			},
			saveBox: function(){
				if(!$('saveWho save').hasClass('disabled')){
					//Now we have added the who reload the sex details page.
					SD.pageLoad(SD.CURRENTSEX);
				}
			},
		});
		SD.DV = new HomeView();
		SD.DV.render();
		return HomeView;
	}();

});