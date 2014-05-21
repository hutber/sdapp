define([
	'dv'
], function () {
	'use strict';

	var myself;

	//set up homeview
	var whoAdd = SD.defaultView.extend({
		el: 'page',
		events: {
				'keyup #who': 'getWho',
				'click addContact': 'openAddContact',
		},
		template: JST['templates/whos/whoAdd.ejs'],
		timer: false,
		getWho: function(){
			var who = $('#who');

			//Is the current name empty? If not make sure the global WHO isn't empty?
			if(who.val().length>0 && SD.WHO.length!==0){
				$('save').removeClass('disabled');
				Object.keys(SD.WHO).forEach(function(me){
					var name = SD.WHO[me];
					//check if the search term is in the SD.WHO object set when logging in.
					if(name.who.toLowerCase()=== who.val() || name.who === who.val()){
						$('save').addClass('disabled');
						SD.message.showMessage('Already one of your names, x', 'bad', 1500);
					}
				});
			} else if(who.val().length===0){
				$('save').addClass('disabled');
				SD.message.showMessage('Names must can\'t be empty...', 'bad', 1500);
			} else{
				$('save').removeClass('disabled');
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