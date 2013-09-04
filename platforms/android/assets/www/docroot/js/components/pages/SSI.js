/**
 * Created with JetBrains PhpStorm.
 * User: Hutber
 * Date: 15/04/13
 * Time: 12:13
 * To change this template use File | Settings | File Templates.
 */
(function() {
    if (typeof window.janrain !== 'object') window.janrain = {};
    if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};

    var jamie = document.URL;
    jamie = jamie.split('/');

    janrain.settings.tokenUrl =  jamie[0]+'//'+ jamie[2];

    function isReady() { janrain.ready = true; };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", isReady, false);
    } else {
        window.attachEvent('onload', isReady);
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
})();
