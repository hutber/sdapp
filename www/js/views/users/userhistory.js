define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';
	//set up homeview
	var history = SD.defaultView.extend({
		el: 'page',
		events: {
			'click deleteButton': 'remove'
		},
		templateMenu: JST['templates/history/historyMenu.ejs'],
		templateFull: JST['templates/history/historyFull.ejs'],
		template: JST['templates/history/history.ejs'],
		remove: function(me){
			var functionName = me.currentTarget.attributes[0].nodeValue;
			SD.VIEWS[document.body.className+'View'][functionName](me);
		},
		removeSex: function(me){

			var parentMe = $(me.currentTarget).parent(),
				deleteDetails = parentMe.find('h2')[0].innerHTML,
				sexId = parentMe[0].id;
				SD.manageSex.removeSex(sexId, deleteDetails, parentMe);
		},
		render: function () {
			var myself = this;

			//Reaplce title with wanted text
			SD.setTitle('Sex History');

			if(Object.keys(SD.FULLSEX).length){
				// #Rewrite HTML on page with tempalte
				myself.$el.html(myself.templateMenu(SD.FULLSEX));

				// #Update the page with individual data from AJAX
				for(var key in SD.FULLSEX) break; //Ggrab out the first item from object
				$('.historyContent').html(myself.template(SD.FULLSEX[key]));

				//Check to make sure that the change event hasn't already been bound.
				if(typeof $._data($("page")[0]).events.change === "undefined"){
					//bind menu change all the way at the top :( page
					$('page').on('change', '#category', function(selection){
						// #Update the page with individual data from AJAX
						$('.historyContent').html(myself.template(SD.FULLSEX[selection.currentTarget.value]));
					});

					//bind menu change all the way at the top :( page
					$('page').on('change', '#month', function(selection){
						// #Update the page with individual data from AJAX
						$('.historyContent').html(myself.template(SD.FULLSEX[selection.currentTarget.value]));
					});
				}
			}else{
				// #Rewrite HTML on page with tempalte
				myself.$el.html(myself.templateMenu());
			}
		}
	});
	return history;
});