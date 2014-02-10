/**
 * Created by Hutber on 04/02/14.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

// #Set up the Deult router view ------------------------------------------------------
	SD.defaultView = function(){ //Default controller for all views
		var templatesNeeded = function () { //create a var of the template view
			var myself;
			if (SD.STATE) { //Chhek if we are logged in or not then give different templates
				myself = {
					header: JST['app/www/js/templates/comp/headerIn.ejs'],
					menu: JST['app/www/js/templates/comp/menu.ejs'],
					shell: JST['app/www/js/templates/comp/shell.ejs'],
					footer: JST['app/www/js/templates/comp/footerIn.ejs'],
				};
			} else if(SD.TEMPLATE === "footerout"){
				myself = {
					header: JST['app/www/js/templates/comp/headerOut.ejs'],
					menu: JST['app/www/js/templates/comp/menu.ejs'],
					shell: JST['app/www/js/templates/comp/shell.ejs'],
					footer: JST['app/www/js/templates/comp/footerOut.ejs'],
				};

			}
			return myself.header() + myself.menu() + myself.shell() + myself.footer();
		}();

		//extend the view with the default home view
		var HomeView = Backbone.View.extend({
			el: 'body > shell',
			events: { //Add click events for global clicks
				'click .logout': 'doLogOut',
				'click logo a': 'goHome',
				'click footer sexnav' : 'sexNav',
				'click footer saveBox': 'saveBox',
			},
			render: function () {
				//make sure we are logged in, if we are not forward back to home page
				SD.login.checkLoginState();

				//Output correct tempalte
				this.$el.html(templatesNeeded);
			},
			doLogOut: function(){
				sessionStorage.clear();
				document.location.replace('/');
				return false;
			},
			goHome: function(){
				SD.ROUTER.navigate('home', true);
				return false;
			},
			globalClass: function(){
				//default class
				var desiredClass = 'selector';


				if(window.location.hash !== ''){
					desiredClass = SD.HASH;
				}

				//Add new class to body
				$('body').removeAttr('class').addClass(desiredClass); //Update class on body
			},
			sexNav: function(m){
				//make sure no elements have any selected items
				$('sexnav div.selected').removeAttr('class');

				//Loop through the elements and work out which one is currently selected
				//from the #sexCurrentlySelected and then set this grab the index of this item
				//This is used to give the slider the current sex
				for(var index in m.currentTarget.children) {
					if(m.target.outerHTML === m.currentTarget.children[index].innerHTML){
						var currentClick = m.currentTarget.children[index],
							currentClickIndex = index;
					}
				}

				//First we make sure that the sexnav element is in fact the correct element.
				//Sometimes we clicked just outside of the element, but still within the sexnav. Causing JS errors
				if(typeof currentClickIndex !== "undefined"){

					//update current sex with the class
					$(currentClick).addClass('selected');

					//Check to see if the slider is open, if it is lets go to slide
					if($('.royalSlider')[0]){
						SD.SLIDER.goTo(currentClickIndex);
					}else{
						SD.pageLoad(currentClick.attributes[0].value);
					}

					SD.SEXDEFAULTS.sexnumber = currentClickIndex;
				}
			},
			saveBox: function(){
				//Now we have added the who reload the sex details page.
				SD.pageLoad(SD.CURRENTSEX);
			},
		});
		SD.DV = new HomeView();
		SD.DV.render();
		return HomeView;
	}();

});