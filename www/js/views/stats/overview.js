define([
	'dv',
	'date',
	'highcharts',
], function () {
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
		template: JST['templates/stats/overview.ejs'],
		render: function () {
			//# Set up JST variables ------------------------------------------------------
			var data = {
				youtotal:SD.TOTALSEXNUMBERS,
				you:SD.SEXNUMBERS,
				world:SD.GLOBALSEXNUMBERS
			};

			//# Output and render the JST view ------------------------------------------------------
			this.$el.html(this.template(data));
			SD.setTitle('Stats Overview');

			/************************************************
			================Mini Graphs====================
			************************************************/

			var colors = [
				'rgba(255, 255, 255, 0.60)',
				'rgba(223, 222, 255, 0.60)',
				'#f1c40f',
				'rgba(220, 134, 177, 0.6)',
				'rgba(0, 0, 0, 0.60)',
			];
			// #Wanks --------------------------------------------------
			var miniPies = ['Wank','Oral','Sex'], valueExsist = false;

			miniPies.forEach(function(me){
				var selector = $('#'+me+'PerMonth');

				selector.css({
					'height': $('.minigraphs').outerWidth()/2.6,
					'width': $('.minigraphs').outerWidth()/2.6
				});
				var totalWanks = Math.round(100 * SD.SEXNUMBERS[me]/SD.SEXNUMBERS.total);

				if(totalWanks){
					if(me === "Wank"){
						me='Selfie';
					}
					valueExsist = true;
					//Now we init the graph
					selector.highcharts({
						chart: {
							backgroundColor: 'transparent',
							plotBackgroundColor: null,
							plotShadow: false,
							marginLeft: 0,
							marginTop: 0,
							spacingLeft: 0,
							spacingRight: 0,
							spacingBottom: 30,
							plotBorderWidth: 0,
	//						height: selector.outerWidth(),
	//						width: selector.outerWidth()+30,
						},
						credits: {
							enabled: false
						},
						colors: colors,
						title: {
							text: totalWanks+'% '+ me,
							style: {
								fontFamily: 'sdFont',
								fontSize: '14px',
								color: '#FFF',
								lineHeight: '20px'
							},
							verticalAlign: 'bottom',
						},
						plotOptions: {
							pie: {
								dataLabels: {
									enabled: false,
									distance: -50,
									style: {
										fontWeight: 'bold',
										color: 'white',
										textShadow: '0px 1px 2px black'
									}
								},
	//						center: ['50%', '50%']
							}
						},
						tooltip: {
							enabled: false
						},
						series: [{
							type: 'pie',
							name: 'Browser share',
	//					innerSize: '50%',
							data: [
								['Total Wanks',   totalWanks],
								['All Sexes', SD.TOTALSEXNUMBERS.total],
							]
						}]
					});
				}
			});

			//Check to see if there is even one pie, if there is not hide the section
			if(!valueExsist)$('.graphicalstats').hide();
		},
	});
	return profile;
});