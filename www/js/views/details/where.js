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
	var where = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchwhere': 'searchwhere',
		},
		template: JST['app/www/js/templates/details/where.ejs'],
		resultreturned: JST['app/www/js/templates/details/where_result.ejs'],
		timer: false,
		searchwhere: function(){
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getwhere, 500);
		},
		getwhere: function(){
			var where = $('#searchwhere'), results = $('whereReturned');
			where.addClass('searching');

			$.ajax({
				url: SD.AJAX+'details/where',
				type: 'POST',
				dataType: "json",
				data: {
					'code': where.val(),
				},
				error: function(data){
					c('Sorry Login Failed: '+data.status);
					where.removeClass('searching');
				},
				success: function(data){
					SD.where = data;
					results.empty();
					data.forEach(function(me){
						results.append(myself.resultreturned(me));
					});
					where.removeClass('searching');
				}
			});
		},
		render: function () {
			myself = this;
			this.$el.html(this.template);
			SD.setTitle('Where did it take place??');
		},
	});
	return where;
});