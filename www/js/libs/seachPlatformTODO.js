/**
 * Created by Hutber on 08/02/14.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd',
	'dsv',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	var myself;

	//set up homeview
	var who = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchwho': 'searchWho',
			'click addContact': 'openAddContact',
			'click person': 'selectWho',
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
			me = $(me.currentTarget);
			me.toggleClass('selected');

			if(me.hasClass('selected')) {
				//Make sure we aren't already in an array
				if ( $.inArray(me.data('name'), SD.SEXDEFAULTS.who) === -1 ) {
					SD.SEXDEFAULTS.who.push(me.data('name'));
				}
			}else {
				SD.SEXDEFAULTS.who.forEach(function(myself, index){
					if(me.data('name') === myself) SD.SEXDEFAULTS.who.splice(index, 1);
				});
			}

			//Also update the SEXDEFAULTS defaults so we can write it to the menu through the already outlined settings
//			SD.SEXDEFAULTS.who = me.data('name');
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