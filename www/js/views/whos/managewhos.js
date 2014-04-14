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
		events: {
			'click .awho': 'removeWho'
		},
		template: JST['app/www/js/templates/whos/managewhos.ejs'],
		removeWho: function(me){
			var whoName = me.currentTarget.children[0].innerHTML, whoId = me.currentTarget.dataset.id;
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
								return me.id !== whoId;
							});

							//replace localStorage for development
							localStorage.whos = JSON.stringify(SD.WHO);

							$('.awho[data-id='+whoId+']').fadeOut('500')
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
//			var hammertime = Hammer(whos).on('dragleft', function(event) {
//				c('slideLeft');
//			});

		},
	});
	return managewhos;
});