define([
	'sd',
	'dv'
], function (SD) {
	'use strict';

	var myself;

	//set up homeview
	var whoAdd = SD.defaultView.extend({
		el: 'page',
		events: {
				'keyup #who': 'searchWho',
				'click addContact': 'openAddContact',
		},
		template: JST['app/www/js/templates/details/whoAdd.ejs'],
		timer: false,
		searchWho: function(){
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getWho, 500);
		},
		getWho: function(){
			var who = $('#who');
			if(who.val().length>2){
				who.addClass('searching');
				$.ajax({
					url: SD.AJAX+'details/whoaddsearch',
					type: 'POST',
					dataType: "json",
					data: {
						'code': who.val(),
						'privateKey': localStorage.privateKey
					},
					error: function(data){
						c('Sorry Login Failed: '+data.status);
						who.removeClass('searching');
					},
					success: function(data){
						who.removeClass('searching');
						if(data.length>0){
							$('save').addClass('disabled');
							SD.message.showMessage('Already one of your names, x', 'bad', 1500);
						}else{
							$('save').removeClass('disabled');
						}
					}
				});
			}else{
				SD.message.showMessage('Names need to be longer than 2 charaters, urh', 'bad', 1500);
			}
		},
		render: function (el) {
			myself = this;
			this.$el.html(this.template);

			//Make the save button disabled
			$('saveWho save').addClass('disabled');

			SD.setTitle('Add a Sex Person');
		}
	});
	return whoAdd;
});