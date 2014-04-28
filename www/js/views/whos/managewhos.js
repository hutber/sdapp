define([
	'sd',
	'hammer',
//	'jqueryhammer',
	'dsv',
], function (SD, Hammer) {
	'use strict';

	//set up homeview
	var managewhos = SD.defaultView.extend({
		el: 'page',
		template: JST['app/www/js/templates/whos/managewhos.ejs'],
		removeWho: function(me){
			var parentMe = $(me.currentTarget).parent(), whoName = parentMe.data('name'), whoId = parentMe.data('id');
			if(confirm('Do you really want to delete ' + whoName)){
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

							parentMe.fadeOut('500')
						}else{
							SD.message.showMessage('A server error occured, please try again :(', 'bad', 1500);
						}
					}
				});
			}
		},
		render: function () {
			var myself = this;
			SD.setTitle('Your Sexy Partners');

			// #Rewrite HTML on page with tempalte
			myself.$el.html(myself.template(SD.WHO));

			var whos = document.getElementsByClassName('awho');
			$('awho').each(function(){
				var myself = $(this);
				Hammer($(this)[0]).on('dragleft', function(event) {
					myself.find('detailsimage').addClass('hiding');
					myself.find('deleteButton').addClass('showing');
				});
				Hammer($(this)[0]).on('dragright', function(event) {
					myself.find('detailsimage').removeClass('hiding');
					myself.find('deleteButton').removeClass('showing');
				});
			})
		},
	});
	return managewhos;
});