define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions'
], function ($, _, Backbone, JST, SD) {
	'use strict';

	var myself;

	//set up homeview
	var who = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchwho': 'searchWho',
			'click addContact': 'openAddContact',
			'click person': 'selectWho'
		},
		template: JST['app/www/js/templates/details/who.ejs'],
		resultreturned: JST['app/www/js/templates/details/who_result.ejs'],
		timer: false,
		searchWho: function(){
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getWho, 500);
		},
		getWho: function(){
			var who = $('#searchwho'), results = $('resultsreturned');
			who.addClass('searching');

			$.ajax({
				url: SD.AJAX+'details/who',
				type: 'POST',
				dataType: "json",
				data: {
					'code': who.val(),
				},
				error: function(data){
					c('Sorry Login Failed: '+data.status);
					who.removeClass('searching');
				},
				success: function(data){
					c(data);
					SD.WHO = data;
					results.empty();
					data.forEach(function(me){
						results.append(myself.resultreturned(me));
					});
					who.removeClass('searching');
				}
			});
		},
		selectWho: function(me){
			c(me);
			SD.SEXDETAILS.who = me.currentTarget.attributes[0].nodeValue;

			//Also update the sexdetails defaults so we can write it to the menu through the already outlined settings
			SD.SEXDEFAULTS.who = me.currentTarget.attributes[0].nodeValue;

			//Now we have added the who reload the sex details page.
			SD.pageLoad(SD.CURRENTSEX);
		},
		render: function () {
			myself = this;
			this.$el.html(this.template);
			SD.setTitle('Who was involved?');
		},
		openAddContact: function(){
			SD.pageLoad('whoadd');
		},
	});
	return who;
});