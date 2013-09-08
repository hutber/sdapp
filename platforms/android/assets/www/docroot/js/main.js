/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../../bower_components/jquery/jquery',
        backbone: '../../bower_components/backbone/backbone',
        underscore: '../../bower_components/underscore/underscore'
    }
});

require([
    'backbone',
    'routes/application'
], function (Backbone, Router) {
    var router = new Router();
    router.on('route:home', function(){
        var appHeight = $(document).outerHeight(),
            bodyHeight = $('body').outerHeight(),
            middleHeight = (appHeight/2)-(bodyHeight/2);

        $('body').css({top: middleHeight, position: 'absolute'});
    });
    Backbone.history.start();
});
