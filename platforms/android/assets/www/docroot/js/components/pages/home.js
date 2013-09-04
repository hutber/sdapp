$('.datetime').datetimepicker({
    inline: true,
    firstDay: 1,
    showOtherMonths: true,
    buttonImage: "img/icons/calendar.gif",
    showOn: "button",
    dateFormat: "yy-mm-dd",
    timeFormat : "HH:mm:ss",
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
});

if(typeof SD === "undefined"){
    var SD = {};
}

SD.home = {};

(function ($) {
    "use strict";

    SD.home.init = function(){
        SD.home.form.init();
        SD.home.location.init();
        SD.home.sliders();
    };

    SD.home.form = {
        init: function(){
            this.clicksThatWillChangeThingsBehindScene();
        },
        clicksThatWillChangeThingsBehindScene:function(){
            $('acts').on('click', 'a', function(m){
                $('acts a.active').removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                if(type===1){
                    $('input[name=who]').val('Myself');
                }
                $('input[name=typeof]').val(type);
                m.preventDefault();
            });
        }
    };

    SD.home.sliders = function() {
        $( "#durationRange" ).slider({
            range: "max",
            min: 0,
            max: 255,
            step: 5,
            slide: function( event, ui ) {
                $( "input[name=extraduration]" ).val( ui.value );
            }
        });
        $( "input[name=extraduration]" ).val( $( "#durationRange" ).slider( "value" ) );
        $( "#orgasmRange" ).slider({
            range: "max",
            min: 0,
            max: 10,
//            step: 15,
            slide: function( event, ui ) {
                $( "input[name=extraorgasm]" ).val( ui.value );
            }
        });
        $( "input[name=extraorgasm]" ).val( $( "#orgasmRange" ).slider( "value" ) );
        $( "#ageRange" ).slider({
            range: "max",
            min: 0,
            max: 99,
            slide: function( event, ui ) {
                $( "input[name=extraage]" ).val( ui.value );
            }
        });
        $( "input[name=extraage]" ).val( $( "#ageRange" ).slider( "value" ) );
        $( "#looksRange" ).slider({
            range: "max",
            min: 0,
            max: 10,
            slide: function( event, ui ) {
                $( "input[name=extralooks]" ).val( ui.value );
            }
        });
        $( "input[name=extralooks]" ).val( $( "#looksRange" ).slider( "value" ) );
    };

    SD.home.location = {
        init: function(){
            var onSuccess = function(location){
                $('input[name=location]').val(location.city.names.en+', '+location.country.iso_code).attr('disabled','disabled');
                $('input[name=locationname]').val(location.city.names.en+', '+location.country.iso_code);
                $('input[name=locationlatt]').val(location.location.latitude);
                $('input[name=locationlongitude]').val(location.location.longitude);
                $('input[name=locationcity]').val(location.city.names.en);
                $('input[name=locationcountry]').val(location.country.names.en);
                $('input[name=locationsubdivisions]').val(location.subdivisions[0].names.en);
                $('input[name=locationcontinent]').val(location.continent.names.en);
            };

            var onError = function(error){
                alert(
                    "Error:\n\n"
                        + JSON.stringify(error, undefined, 4)
                );
            };

            geoip2.city(onSuccess, onError);
        }
    };

})(jQuery);

SD.home.init();
$('input[name=whereithappened]').autocompletefullscreen();