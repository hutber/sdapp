if(typeof SD === "undefined"){
    var SD = {};
}

SD.settings = {};

(function ($) {
    "use strict";

    SD.settings.init = function(){
        SD.settings.form.init();
    };

    SD.settings.form =function(){
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
    };
})(jQuery);

SD.settings.init();