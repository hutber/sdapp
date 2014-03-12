define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'sd.functions',
	'dsv',
	'slider',
	'highcharts'
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
				navigateByClick: false,
				block: {
					delay: 400
				}
			});


			//Graphs Global Vars
			var allDates = [];

			// #All Rows
			var SexByMonthData = JSON.parse(sessionStorage.sexesByMonth);
			// #Set up Wank Rows --------------------------------------------------
			var Wank = {
					name: 'Wank',
					data: []
				},
				Hands = {
					name: 'Hands',
					data: []
				},
				Oral = {
					name: 'Oral',
					data: []
				},
				Sex = {
					name: 'Sex',
					data: []
				},
				Anything = {
					name: 'Anything',
					data: []
				};
			SexByMonthData.Wank.forEach(function(me){
				Wank.data.push(parseInt(me.months, 10));
			});
			SexByMonthData.Hands.forEach(function(me){
				Hands.data.push(parseInt(me.months, 10));
			});
			SexByMonthData.Oral.forEach(function(me){
				Oral.data.push(parseInt(me.months, 10));
			});
			SexByMonthData.Sex.forEach(function(me){
				Sex.data.push(parseInt(me.months, 10));
			});
			SexByMonthData.Anything.forEach(function(me){
				Anything.data.push(parseInt(me.months, 10));
			});
			// #Set Array used for Line Graph --------------------------------------------------
//			var lineGraphData = [], lineLabelsDate = [];
//			.forEach(function(me){
//				lineLabelsDate.push(Date.today().set({ month: me.date-1}).toString("MMM"));
//				lineGraphData.push(me.months);
//			});
//
//			c(lineLabelsDate);
//			c(lineGraphData);

			$('#container').highcharts({
				chart: {
					backgroundColor: '#8DC5C1',
					type: 'area',
					spacingLeft: 0,
//					marginLeft: 15,
					spacingRight: 0,
					borderColor: '#BBEEB8'
				},
				colors: [
					'#7B91C2',
					'#FEB0B2',
					'#B3C2E1',
					'#28437E',
					'#BBEEB8',
					'#237774',
					'#6CB7B4',
					'#A3B6E1',
					'#AADBD9',
					'#697692',
					'#2F8F2A',
					'#BE8485',
					'#A53134',
					'#5F8988',
					'#86DC82',
					'#75A572',
					'#A8EEA5',
					'#98DBD8',
					'#FFDC96',
					'#BFAB84',
					'#A67E31',
					'#FFE4B1',
					'#FFECC6',
					'#FD9698',
					'#FEC5C6',
				],
				xAxis: {
					title: {
						text:''
					},
					labels: {
						formatter: function() {
							return this.value; // clean, unformatted number for year
						}
					}
				},
				credits: {
					enabled: false
				},
				yAxis: {
					labels: {
						formatter: function() {
							return this.value;
						}
					}
				},
				series: [Wank,Hands, Oral, Sex, Anything]
			});
		},
	});
	return profile;
});