define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dsv',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	var myself;

	//set up homeview
	var who = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchwho': 'searchWho',
//			'click addContact': 'openAddContact',
			'click result': 'selectSearchResults',
		},
		template: JST['app/www/js/templates/details/who.ejs'],
		resultreturned: JST['app/www/js/templates/details/who_result.ejs'],
		timer: false,
		searchWho: function(){
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getWho, 500);
		},
		getWho: function(){
			var who = $('#searchwho'), results = $('whoReturned');
			who.addClass('searching');

			$.ajax({
				url: SD.AJAX+'details/who',
				type: 'POST',
				dataType: "json",
				data: {
					'code': who.val(),
					'privateKey': sessionStorage.privateKey
				},
				error: function(data){
					c('Sorry Login Failed: '+data.status);
					who.removeClass('searching');
				},
				success: function(data){
					SD.WHO = data;
					results.empty();
					data.forEach(function(me){
						results.append(myself.resultreturned(me));
					});
					who.removeClass('searching');
				}
			});
		},
		//With each click we update the global object
		selectSearchResults: function(me){
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
		},
		render: function () {
			myself = this;

			this.$el.html(this.template);

			//Add click event for the plus
			$('html').on('click', '.who add', function(){
				SD.pageLoad('whoadd');
			});

			$('save').addClass('disabled');
			SD.setTitle('Who was involved?');
		}
	});
	return who;
});