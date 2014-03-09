define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'chart',
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
			SD.convertSexNumbers();
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
					value : SD.SEXNUMBERS.Wank,
					color : "#F7464A",
					label : 'Wank',
					labelColor : '#FFF',
					labelFontSize : '20',
					labelAlign : 'left'
				},
				{
					value : SD.SEXNUMBERS.Hands,
					color : "#E2EAE9",
					label : 'Hands',
					labelColor : '#444',
					labelFontSize : '20',
					labelAlign: 'center'
				},
				{
					value : SD.SEXNUMBERS.Oral,
					color : "#D4CCC5",
					label : 'Oral',
					labelColor : '#FFF',
					labelFontSize : '15'
				},
				{
					value : SD.SEXNUMBERS.Sex,
					color : "#949FB1",
					label : 'Sex',
					labelColor : '#FFF',
					labelFontSize : '25'
				},
				{
					value : SD.SEXNUMBERS.Anything,
					color : "#4D5360",
					label : 'Anything Else',
					labelColor : '#FFF',
					labelFontSize : '10'
				}
			];

			var myChart = new Chart(graph[0].getContext("2d"));
			var myPie = myChart.Pie(pieData, {
				animationSteps: 100,
				animationEasing: 'easeOutBounce'
			});
		},
	});
	return profile;
});