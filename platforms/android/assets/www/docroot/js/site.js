/**
 * Created with JetBrains PhpStorm.
 * User: Hutber
 * Date: 06/04/13
 * Time: 23:49
 * To change this template use File | Settings | File Templates.
 */
//Rebind console to c
var c = false,
    cl = c;

if(typeof console === "object" && typeof console.error === "function"){
    c = console,
        cl = function (msg){"use strict"; c.info(msg);};
}else{
    cl =  function (msg){"use strict"; alert(msg);};
}

SD = {};

(function ($) {
    "use strict";

    SD.init = function(){
        SD.overlay.init();
        SD.message.init();
        SD.signIn.init();
    };

//Pop up overlay script
    SD.overlay = {
        init:function () {
            $('#overlay').click(this.close);
            $(".overlayContent").click(function (e) {
                e.stopPropagation();
            });
            //Bind all elements with class .overlay to open the pop up
            this.open($('.overlay'));
        },
        open:function (selector, width) {
            if (width === "undefined") {width = selector.data('width');}

            selector.click(function () {
                $('#overlay, .overlayContent').fadeIn('fast');
                $('.overlayContent').css({'width':width});
                if (selector.attr('href') !== "undefined") e('balls');$('.overlayContent').load('http://sexdiaries.local/'+selector.attr('href'));
                return false;
            });
        },
        close:function () {
            $('#overlay, .overlayContent').hide();
        }
    };
    SD.message = {
        myself: $('.message'),
        //this is used to check if we have warning from the start. If we do this normally means somebody has been sent a deep link, in which case we don't want normal JS to run until the user has selected a cattegory.
        isSet: false,
        init: function() {
            if(this.myself.is(':visible')){
                SD.message.isSet = true;
                setTimeout(this.close, 5000);
            }
//            $('.message span').live("click",this.close);
        },
        close: function(){
            $('.message').slideUp(function(){
                $(this).remove();
            });
        },
        open: function(type,message){
            $('<div class="message popupMessage '+ type +'"><span>X</span>'+ message +'</div>').insertAfter($('#header'));
        },
        startCountDown: function (){
            setTimeout(this.close, 3500);
        }
    }

    SD.signIn = {
        init :function(){
            if($('.login').is(':visible')){
                this.ssi();
            }
        },
        timer: false,
        endAndStartTimer: function () {
            window.clearTimeout(SD.signIn.timer);
            //var millisecBeforeRedirect = 10000;
            if($('.janrainPage ul').length<1){
                SD.signIn.timer = window.setTimeout(SD.signIn.endAndStartTimer,100);
            }else{
                $('.providers').each(function(){
                    var theLink = $(this).find('a');
                    $(this).removeAttr('style').find('li, a, span').removeAttr('style');
                    $('#openid_choice').append($(this));
                });
                $('#janrainEngageEmbed').hide();
            }
        },
        isReady : function(){
            janrain.ready = true;
        },
        ssi : function(){
            if (typeof window.janrain !== 'object') window.janrain = {};
            if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};

            var jamie = document.URL;
            jamie = jamie.split('/');

            janrain.settings.tokenUrl =  jamie[0]+'//'+ jamie[2];

            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", this.isReady, false);
            } else {
                window.attachEvent('onload', this.isReady);
            }

            var e = document.createElement('script');
            e.type = 'text/javascript';
            e.id = 'janrainAuthWidget';

            if (document.location.protocol === 'https:') {
                e.src = 'https://rpxnow.com/js/lib/sexdiaries/engage.js';
            } else {
                e.src = 'http://widget-cdn.rpxnow.com/js/lib/sexdiaries/engage.js';
            }

            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(e, s);

            SD.signIn.endAndStartTimer();
        }
    };
})(jQuery);

SD.init();