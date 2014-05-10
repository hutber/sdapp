define([
	'sd',
	'dsv',
], function (SD) {
	'use strict';

	var myself;

	//set up homeview
	var who = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchwho': 'getWho',
			'click result': 'selectSearchResults',
		},
		template: JST['templates/whos/who.ejs'],
		resultreturned: JST['templates/whos/who_result.ejs'],
		timer: false,
		checkIfAWhoIsSelected: function(){
			if(!$('result').hasClass('selected')) {$('save').addClass('disabled');}
		},
		getWho: function(){
			var who = $('#searchwho'), results = $('whoReturned'), myself = this;
			//Remove previous results
			results.empty();
			Object.keys(SD.WHO).forEach(function(me){
				var name = SD.WHO[me];

				//Check to see if any of the names in the list have been previously selected
				var selected = false;

				//check if the search term is in the SD.WHO object set when logging in.
				if(name.who.toLowerCase().indexOf(who.val())!==-1){
					results.append(myself.resultreturned({'item':name, 'selected': selected}));
				}
			});
		},
		selectSearchResults: function(me){
		//With each click we update the global object
			me = $(me.currentTarget);
			me.toggleClass('selected');

			if(me.hasClass('selected')) {
				//Make sure we aren't already in an array
				if ( $.inArray(me.data('id'), SD.SEXDEFAULTS[SD.HASH]) === -1 ) {
					var id = me.data('name');
					SD.SEXDEFAULTS[SD.HASH][id] = me.data('id');
					$('save').removeClass('disabled');
				}
			}else {
				//If we are in the array and we have already been selected remove from the object
				for	(var index in SD.SEXDEFAULTS[SD.HASH]) {
					if(me.data('name') === index){delete SD.SEXDEFAULTS[SD.HASH][me.data('name')];}
				}
			}
			this.checkIfAWhoIsSelected();
		},
		render: function () {
			var myself = this;
			this.$el.html(this.template(SD.WHO));
			var results = $('whoReturned'),
				whos = Object.keys(SD.SEXDEFAULTS.who);

			//Display the last 7 whos in order of how often they were used
			Object.keys(SD.WHO).forEach(function(me){
				var name = SD.WHO[me],
					selected = false;
				if(whos.length>0){
					selected = function(){
						var value = false;
						whos.forEach(function(me){
							if(name.who === me) {
								value = true;
							}
						});
						return value;
					}();
				}
				results.append(myself.resultreturned({'item':name, 'selected': selected}));
			});
			this.checkIfAWhoIsSelected();
			SD.setTitle('Who was involved?');
		}
	});
	return who;
});