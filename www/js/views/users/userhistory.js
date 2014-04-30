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
		templateMenu: JST['app/www/js/templates/history/historyMenu.ejs'],
		templateFull: JST['app/www/js/templates/history/historyFull.ejs'],
		template: JST['app/www/js/templates/history/history.ejs'],
		remove: function(me){
			var functionName = me.currentTarget.attributes[0].nodeValue;
			SD.VIEWS[document.body.className+'View'][functionName](me);
		},
		removeSex: function(me){
			var parentMe = $(me.currentTarget).parent().parent(),
				deleteDetails = parentMe.find('h2')[0].innerHTML,
				sexId = parentMe[0].id;
			if(confirm('Do you really want to delete ' + deleteDetails)){
				SD.spinner.show();
				$.ajax({
					url: SD.AJAX+'sex/deletesex',
					type: 'POST',
					data: {
						'id': sexId,
						'privateKey': localStorage.privateKey,
					},
					error: function(data){
						SD.spinner.hide();
						SD.message.showMessage('A server error occured, please try again >:|', 'bad', 1500);
					},
					success: function(data){
						SD.spinner.hide();
						if(data === ""){
							var toDeleteIndex = -1,
								toDeleteMonth = '',
								toDeleteSexString = '';

							//Loopthough all sexes in fullsex
							Object.keys(SD.FULLSEX).forEach(function(me){
								var i = 0;
								SD.FULLSEX[me].forEach(function(myself){
									var sid = parseInt(myself.id);
									if(parseInt(sexId) === sid){
										toDeleteMonth = me;
										toDeleteSexString = myself.sexstring;
										toDeleteIndex = i;
									}
									i++;
								});
							});
							SD.FULLSEX[toDeleteMonth].splice(toDeleteIndex, 1);
							//Replace localstorage for saving for user
							SD.saveVar('FULLSEX');

							//Remove sex stats from SD.BYMONTH
							SD.BYMONTH[toDeleteSexString][toDeleteMonth].numberof = SD.BYMONTH[toDeleteSexString][toDeleteMonth].numberof-1;
							//Replace localstorage for saving for user
							SD.saveVar('BYMONTH');

							parentMe.fadeOut('500');
						}else{
							SD.message.showMessage('A server error occured, please try again :(', 'bad', 1500);
						}
					}
				});
			}
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