define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'chart',
	'dsv',
	'slider',
], function ($, _, Backbone, JST, SD) {
	'use strict';

	//set up homeview
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/users/profile.ejs'],
		render: function () {
			SD.convertSexNumbers.init();

			//# Set up JST variables ------------------------------------------------------
			var data = {
				you:SD.SEXNUMBERS,
				world:SD.GLOBALSEXNUMBERS
			};

			//# Output and render the JST view ------------------------------------------------------
			this.$el.html(this.template(data));
			SD.setTitle('Sex Overview');

			//Resize the graph
			var wantedWidth = $('body').outerWidth(),
				wantedHeight = $('content').outerHeight()/3,
				graph = $('#sexpeak');

			graph.attr({
				'height': wantedWidth-30,
				'width' : wantedWidth
			});

			$('.profile .royalSlider').royalSlider({ //Set up slider
				controlNavigationSpacing: 10,
				controlNavigation: 'bullets',
				loop: true,
				arrowsNav: false,
				keyboardNavEnabled: true,
				block: {
					delay: 400
				}
			});


			//# Set up dates for graphs ------------------------------------------------------
			var dates = {
				sixMonths : Date.today().addMonths(-6).toString("MMMM"),
				fiveMonths : Date.today().addMonths(-5).toString("MMMM"),
				fourMonths : Date.today().addMonths(-4).toString("MMMM"),
				threeMonths : Date.today().addMonths(-3).toString("MMMM"),
				twoMonths : Date.today().addMonths(-2).toString("MMMM"),
				oneMonths : Date.today().addMonths(-1).toString("MMMM"),
				now : Date.today().toString("MMMM"),
			};
			var data = {
				labels : [dates.sixMonths, dates.fiveMonths, dates.fourMonths, dates.threeMonths, dates.twoMonths,dates.oneMonths, 'Today'],
				datasets : [
					{
						fillColor : "rgba(220,220,220,0.5)",
						strokeColor : "rgba(220,220,220,1)",
						pointColor : "rgba(220,220,220,1)",
						pointStrokeColor : "#fff",
						data : [65,59,90,81,56,55,40]
					},
					{
						fillColor : "rgba(151,187,205,0.5)",
						strokeColor : "rgba(151,187,205,1)",
						pointColor : "rgba(151,187,205,1)",
						pointStrokeColor : "#fff",
						data : [28,48,40,19,96,27,100]
					}
				]
			};

			var pieData = [
				{
					value : SD.SEXNUMBERS.Wank,
					color : "#A53134",
					label : 'Wank',
					labelColor : '#FFF',
					labelFontSize : '20',
					labelAlign : 'left'
				},
				{
					value : SD.SEXNUMBERS.Hands,
					color : "#28437E",
					label : 'Hands',
					labelColor : '#444',
					labelFontSize : '20',
					labelAlign: 'center'
				},
				{
					value : SD.SEXNUMBERS.Oral,
					color : "#2F8F2A",
					label : 'Oral',
					labelColor : '#FFF',
					labelFontSize : '15'
				},
				{
					value : SD.SEXNUMBERS.Sex,
					color : "#DC87B1",
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
			var myPie = myChart.Line(data, {
//				segmentStrokeColor : "#AADBD9",
				animateScale: true,
			});
		},
	});
	return profile;
});