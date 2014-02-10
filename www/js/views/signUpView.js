/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'sd.functions',
	'dv',
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var SignUpView = SD.defaultView.extend({
		el: 'page',

        template: JST['app/www/js/templates/login/signup.ejs'],

        render: function () {
            this.$el.html(this.template);
			this.globalClass();
        },

		data: {
			site: SD.liveApp
		},

        events: {
//            'submit .loginForm ': 'logUserIn'
        },

        logUserIn: function (elem) {
			var items = $(elem.currentTarget).find('input'),
				noerror = true;
			items.each(function (himself){
				var myDad = $(this).parent();
				if($(this).val()===""){
					myDad.addClass('error');
					noerror = false;
				}else {
					myDad.removeClass('error');
				}
			});

			if(noerror){
				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				$.ajax({
					url: SD.AJAX+'users/login',
					type: 'POST',
					dataType: "json",
					data: {
						'uname': values.uname,
						'pword': values.pword
					},
					error: function(data){
						c(data.status);
						SD.overlay.hideme();
					},
					success: function(data){
						c('Login code:'+ data.code);
						if(data.privateKey){
							$.jStorage.set('uid',data.ud.uid); //store user ID in the localStorage to persist
							sessionStorage.setItem('privateKey',data.privateKey); //store privateKey in session so it disapears when the user closers the tab
							Backbone.history.loadUrl('#home');
						}
						SD.overlay.hideme();
					}
				});
			}
            return false;
        }
    });
    return SignUpView;
});