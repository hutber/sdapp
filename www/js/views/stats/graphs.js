define([
	'sd',
	'dv',
	'date',
	'slider',
	'highcharts',
	'flowtype',
], function (SD) {
	'use strict';

	function createData (object, type) {
		var tempType = [];
			tempType.name = type,
			tempType.data = [];
		object[type].forEach(function(me){
			tempType.data.push(parseInt(me.numberof, 10));
		});
		return tempType;
	}

	//set up homeview
	var profile = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		template: JST['app/www/js/templates/stats/graphs.ejs'],
		render: function () {

			//# Output and render the JST view ------------------------------------------------------
			this.$el.html(this.template(areaData));
			SD.setTitle('Sex Graph');

			/************************************************
				=================Graph====================
			************************************************/
			//Resize the graph
			var wantedWidth = $('body').outerWidth()/1.05,
				graph = $('#sexoverview');

			graph.css({
				'height': $('page').outerHeight()/1.1,
				'width' : wantedWidth
			});

			// #Graphs Global Vars --------------------------------------------------
			var areaData = [];

			// #set up vars --------------------------------------------------
			var details = ['Wank','Hands','Oral','Sex','Anything'];

			// #build new arrays for graph --------------------------------------------------
			details.forEach(function(me){
				var stats = createData(SD.BYMONTH, me);
				if(stats.data.length>0)
				areaData.push(stats);
			});

			// #Build Months In Results, convert it to an array --------------------------------------------------
			//We need to know all the months in the last 6 months for the labels
			var highestRow = null, highestObject = null;
			for(var key in SD.BYMONTH){
				if(SD.BYMONTH[key].length > highestRow){
					highestObject = key;
					highestRow = SD.BYMONTH[key].length;
				}
			}

			// #Build month names NB: This is only used labels --------------------------------------------------
			var lineLabelsDate = [];
			for(var i=0; i<highestRow; i++){
				lineLabelsDate.push(Date.today().addMonths(-i).toString("MMM"));
			}
			lineLabelsDate.reverse();

			var colors = [
				'rgba(255, 255, 255, 0.60)',
				'rgba(223, 222, 255, 0.60)',
				'#f1c40f',
				'rgba(220, 134, 177, 0.6)',
				'rgba(0, 0, 0, 0.60)',
			];

			if(areaData.length){
				$('.nostats').hide();
				$('monthpicker').flowtype({
					minFont   : 12,
					maxFont   : 18,
					fontRatio : 20
				});

				graph.highcharts({
					chart: {
						backgroundColor: 'transparent',
						borderColor: '#272C33',
						type: 'spline',
						spacingLeft: 0,
						spacingTop: 20,
						marginLeft: 30,
						spacingRight: 0,
						spacingBottom: 30,
						plotBorderWidth: 0,
					},
					title:{
						text:''
					},
					credits: {
						enabled: false
					},
					colors: colors,
					plotOptions: {
						spline:{
							lineWidth: 4,
							states: {
								hover: {
									lineWidth: 5
								}
							},
							marker: {
								enabled: false
							},
							connectNulls: true,
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: 0,
						y: 0,
						floating: true,
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						itemStyle: {
							color: '#FFF',
							fontFamily: 'sdFont',
							padding: '14px',
						}
					},
					tooltip: {
						backgroundColor: 'rgba(255, 255, 255, 0.65)',
						borderColor: '#75B4B1',
						borderRadius: '2',
						shadow: false,
						style: {
							color: '#75B4B1',
							fontSize: '14px',
							padding: '8px',
							fontFamily: 'sdFont',
							textShadow: '1px 1px 1px #000'
						},
					},
					xAxis: {
						lineColor: '#FFFFFF',
						lineWidth: 1,
						dateTimeLabelFormats: true,
						title: {
							text:'',
						},
	//					ordinal: false,
						gridLineColor: 'rgba(196, 228, 228, 0.75)',
						categories: lineLabelsDate,
						labels:  {
							overflow: 'justify',
							style: {
								color: '#fff',
								fontFamily: 'sdFont'
							}
						}
					},
					yAxis: {
						lineColor: '#FFFFFF',
						lineWidth: 1,
						gridLineColor: 'rgba(196, 228, 228, 0.75)',
						min: 0,
						title: {
							text:'',
						},
						labels: {
							style: {
								color: '#fff',
								fontFamily: 'sdFont'
							},
							formatter: function() {
								return this.value;
							}
						},
						plotBands: [
							{
								from: 0,
								to: 10,
								color: 'rgba(68, 170, 213, 0.1)',
								label: {
									text: 'Beginner',
									style: {
										color: '#FFF'
									}
								}
							},
								{
								from: 10,
								to: 20,
								label: {
									text: 'Average Joe',
									style: {
										color: '#FFF'
									}
								}
							},
								{
								from: 20,
								to: 30,
								color: 'rgba(68, 170, 213, 0.1)',
								label: {
									text: 'Player?',
									style: {
										color: '#FFF'
									}
								}
							},
							{
								from: 30,
								to: 40,
								label: {
									text: 'Fucking Rock Star!',
									style: {
										color: '#FFF'
									}
								}
							},
							{
								from: 40,
								to: 60,
								color: 'rgba(68, 170, 213, 0.1)',
								label: {
									text: 'Ok fuck off now',
									style: {
										color: '#FFF'
									}
								}
							},
							{
								from: 60,
								to: 600,
								label: {
									text: 'Porn Star',
									style: {
										color: '#FFF'
									}
								}
							}
						]
					},
					series: areaData
				});
			}else{
				$('.stats').hide();
			}
		}
	});
	return profile;
});