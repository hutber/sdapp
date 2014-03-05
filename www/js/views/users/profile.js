define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dsv',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/profile.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Sex Through an App');

			//Resize the graph
			var wantedWidth = $('body').outerWidth(),
				wantedHeight = $('content').outerHeight()/3,
				graph = $('#sexpeak');

			graph.attr({
				'height': wantedWidth-30,
				'width' : wantedWidth
			});


			var pieData = [
				{
					value: 30,
					color : "#F38630",
					label : 'Sleep',
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value : 50,
					color : "#E0E4CC",
					label : 'Sleep',
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value : 100,
					color : "#69D2E7",
					label : 'Sleep',
					labelColor : 'white',
					labelFontSize : '16'
				}

			];

			var myPie = new Chart(graph[0].getContext("2d")).Doughnut(pieData);
		},
	});
	return profile;
});