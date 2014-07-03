define([
	'dsv',
], function () {
	'use strict';

	var myself;

	//set up homeview
	var place = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup #searchplace': 'searchplace',
		},
		template: JST['templates/place/place.ejs'],
		resultreturned: JST['templates/place/place_result.ejs'],
		timer: false,
		searchplace: function(){
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getplace, 500);
		},
		getplace: function(){
			var place = $('#searchplace'), results = $('placeReturned');
			place.addClass('searching');

			$.ajax({
				url: SD.AJAX+'place/place',
				type: 'POST',
				dataType: "json",
				data: {
					'code': place.val(),
				},
				error: function(data){
//					c('Sorry Login Failed: '+data.status);
					place.removeClass('searching');
				},
				success: function(data){
					results.empty();
					data.forEach(function(me){
						results.append(myself.resultreturned(me));
					});
					place.removeClass('searching');
				}
			});
		},
		render: function () {
			myself = this;
			this.$el.html(this.template);
			SD.setTitle('Where did it take place??');
		},
	});
	return place;
});