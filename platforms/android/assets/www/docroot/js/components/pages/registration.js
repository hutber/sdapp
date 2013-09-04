/**
 * Created with JetBrains PhpStorm.
 * User: Hutber
 * Date: 06/04/13
 * Time: 23:48
 * To change this template use File | Settings | File Templates.
 */

(function ($) {
    "use strict";

    if(typeof $.fn.forms==="function")
    $('form').forms();

    var timer;
    function endAndStartTimer() {
        window.clearTimeout(timer);
        //var millisecBeforeRedirect = 10000;
        if($('.janrainPage ul').length<1){
            timer = window.setTimeout(endAndStartTimer,100);
        }else{
            $('.providers').each(function(){
                var theLink = $(this).find('a');
                $(this).removeAttr('style').find('li, a, span').removeAttr('style');
                $('#openid_choice').append($(this));
            });
            $('#janrainEngageEmbed').hide();
        }
    }
    endAndStartTimer();



})(jQuery);

