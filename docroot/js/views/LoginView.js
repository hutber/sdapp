/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'JST',
	'../sd.functions',
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var LoginView = SD.defaultView.extend({
		el: 'page',

        template: JST['platforms/android/assets/www/docroot/js/templates/login.ejs'],

        render: function () {
			SD.templates.login = this.template;
            this.$el.html(this.template);
        },

        events: {
            'submit .loginForm ': 'logUserIn'
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
//				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				c(values.uname);
				c(SD);
				$.ajax({
					url: SD.AJAX+'users/login',
					type: 'post',
					data: {
						'uname': values.uname,
						'pword': values.pword
					},
					crossDomain: true,
					error: function(data){
//						SD.overlay.hideme();
						alert(data.status);
						c(data);
					},
					success: function(data){
						data = JSON.parse(data);
//						SD.overlay.hideme();
						if(data.privateKey){
							$.jStorage.set('uid',data.ud.uid); //store user ID in the localStorage to persist
							sessionStorage.setItem('privateKey',data.privateKey); //store privateKey in session so it disapears when the user closers the tab
							Backbone.history.loadUrl('');
						}else{
							alert(data.message);
						}
					}
				});
			}
            return false;
        }
    });
    return LoginView;
});