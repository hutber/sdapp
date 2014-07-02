define([
	'dsv',
], function () {
	'use strict';

	//set up positions
	var positions = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchpos': 'getPos',
			'click posresult': 'selectPosResults',
		},
		template: JST['templates/positions/positions.ejs'],
		resultreturned: JST['templates/positions/positions_result.ejs'],
		saveBtn: JST['templates/comp/saveBtn.ejs'],
		timer: false,
		checkIfAWhoIsSelected: function(){
			if(!$('posresult').hasClass('selected')) {$('save').addClass('disabled');}
		},
		getPos: function(){
			var searchPos = $('#searchpos'), results = $('posReturned'), myself = this;
			//Remove previous results
			results.empty();
			Object.keys(SD.POSITIONS).forEach(function(me){
				var name = SD.POSITIONS[me];

				//Check to see if any of the names in the list have been previously selected
				var selected = false;

				//check if the search term is in the SD.WHO object set when logging in.
				if(name.toLowerCase().indexOf(searchPos.val())!==-1 || name.indexOf(searchPos.val())!==-1){
					results.append(myself.resultreturned({'position':name, 'positionNumber':me, 'selected': selected}));
				}
			});
		},
		selectPosResults: function(me){
		//With each click we update the global object
			me = $(me.currentTarget);
			me.toggleClass('selected');
			var meId = me.data('id'),
				posName = me.data('name');

			if(me.hasClass('selected')) {
				//Make sure we aren't already in an array
				if ( $.inArray(me.data('id'), SD.SEXDEFAULTS[SD.HASH]) === -1 ) {
					if(SD.SEXDEFAULTS[SD.HASH] === null) {SD.SEXDEFAULTS[SD.HASH] = {};}
					SD.SEXDEFAULTS[SD.HASH][meId] = posName;
					$('save').removeClass('disabled');
				}
			}else {
				//If we are in the array and we have already been selected remove from the object
				for	(var index in SD.SEXDEFAULTS[SD.HASH]) {
					if(parseInt(meId) === parseInt(index)){delete SD.SEXDEFAULTS[SD.HASH][meId];}
				}
			}
			this.checkIfAWhoIsSelected();
		},
		render: function () {
			var myself = this;
			this.$el.html(this.template(SD.WHO));
//			this.$el.html(this.template(SD.WHO)+this.saveBtn({'name':'Position', 'savetext':'Save Positions Used'}));
			var results = $('posReturned');
			var positions = (SD.SEXDEFAULTS.positions !== null) ? Object.keys(SD.SEXDEFAULTS.positions) : {};

			//Display the last 7 whos in order of how often they were used
			Object.keys(SD.POSITIONS).forEach(function(me){
				var name = SD.POSITIONS[me],
					selected = false;
				if(positions.length>0){
					selected = function(){
						var value = false;
						positions.forEach(function(item){
							if(me === item) {
								value = true;
							}
						});
						return value;
					}();
				}
				results.append(myself.resultreturned({'position':name, 'positionNumber':me, 'selected': selected}));
			});
			this.checkIfAWhoIsSelected();
			SD.setTitle('Who was involved?');
		}
	});
	return positions;
});