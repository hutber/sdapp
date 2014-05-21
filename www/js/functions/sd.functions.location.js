/*
 ==================================================
 Table of Contents - Created by Hutber on 21/05/13.
 ==================================================
 */
define([
//	'mobiscroll',
], function () {

	/*==================================================
	Login functions
	================================================== */

	SD.location = {
		buildObject: function(data){
				var tmpData = function(){
				if(typeof data.address !== "undefined"){
					return data.address;
				}else{
					return data;
				}
			}();
			return {
				lat: data.lat,
				lon: data.lon,
				house: tmpData.house,
				house_number: tmpData.house_number,
				road: tmpData.road,
				supermarket: tmpData.supermarket,
				city: tmpData.city,
				city_district: tmpData.city_district,
				country: tmpData.country,
				country_code: tmpData.country_code,
				county: tmpData.county,
				neighbourhood: tmpData.neighbourhood,
				pedestrian: tmpData.pedestrian,
				place_of_worship: tmpData.place_of_worship,
				postcode: tmpData.postcode,
				state: tmpData.state,
				suburb: tmpData.suburb,
			};
		},
		locationSucess:function(position) {
			if(!SD.SEXDEFAULTS.location[0]){
				$.ajax({
					url: 'http://nominatim.openstreetmap.org/reverse',
					dataType: "json",
					data: {
						'format': 'json',
						'lat': position.coords.latitude,
						'lon': position.coords.longitude,
						'zoom' : 18
					},
					error: function(data){
						SD.spinner.hide();
					},
					success: function(data){
						SD.SEXDEFAULTS.location[0] = SD.location.buildObject(data);
						SD.SEXDEFAULTS.location[1] = data.address.city_district + ', '+ data.address.city +', '+data.address.country_code.toUpperCase();
						$('location location').html(SD.SEXDEFAULTS.location[1]);
						SD.spinner.hide();
					}
				});
			}
		},
		locationFail: function (error) {
			SD.message.showMessage('Sorry, maybe your gps isn\'t turned on?', 'bad');
			SD.spinner.hide();
		}
	};

	return SD;
});