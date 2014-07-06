define([
	'dsv',
], function () {
	'use strict';

	//set up homeview
	var managewhos = SD.defaultView.extend({
		el: 'page',
		template: JST['templates/whos/managewhos.ejs'],
		removeWho: function(me){
			var parentMe = $(me.currentTarget).parent(), whoName = parentMe.data('name'), whoId = parentMe.data('id');
			SD.UI.Dialog('Delete this person?', 'Do you really want to delete ' + whoName, ['Cancel', 'Yes Please'], function(){
				SD.spinner.show();
				$.ajax({
					url: SD.AJAX+'details/deletewho',
					type: 'POST',
					data: {
						'whoid': whoId,
						'privateKey': localStorage.privateKey,
					},
					error: function(data){
						SD.spinner.hide();
						SD.message.showMessage('A server error occured, please try again >:|', 'bad', 1500);
					},
					success: function(data){
						SD.spinner.hide();
						if(data === ""){
							//Remove it from the current WHO's
							SD.WHO = SD.WHO.filter(function(me){
								return parseInt(me.id) !== parseInt(whoId);
							});
							//Replace localstorage for saving for user
							SD.saveVar('WHO');

							parentMe.fadeOut('500');
						}else{
							SD.message.showMessage('A server error occured, please try again :(', 'bad', 1500);
						}
					}
				})
			}, 'confirm');
		},
		render: function () {
			var myself = this;
			SD.setTitle('Your Sexy Partners');

			// #Rewrite HTML on page with tempalte
			myself.$el.html(myself.template(SD.WHO));
		},
	});
	return managewhos;
});