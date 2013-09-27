/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../../dist/js/templates',
	'../sd.functions',
	'../core.functions'
], function ($, _, Backbone, JST, SD) {
    'use strict';

    var LoginView = Backbone.View.extend({
		el: 'body > content',

        template: JST['platforms/android/assets/www/docroot/js/templates/login.ejs'],

        render: function () {
            this.$el.html(this.template);
        },

        events: {
            'submit .loginForm ': 'logUserIn'
        },

        logUserIn: function (elem) {
			var items = $(elem.currentTarget).find('input'),
				error = true;
			items.each(function (himself){
				var myDad = $(this).parent();
				if($(this).val()===""){
					myDad.addClass('error');
					error = false;
				}else {
					myDad.removeClass('error');
				}
			});

			if(error){
				SD.overlay.showme();
				var values = $(elem.currentTarget).serializeObject();
				$.ajax({
					url: SD.AJAX+'users/login',
					type: 'post',
					data: {
						'uname': values.uname,
						'pword': values.pword
					},
					crossDomain: true,
					error: function(){
						alert('o fuck!');
					},
					success: function(data){
						data = JSON.parse(data);
						SD.overlay.hideme();
						$.jStorage.set('uid',data.ud.uid); //store user ID in the localStorage to persist
						sessionStorage.setItem('privateKey',data.privateKey); //store privateKey in session so it disapears when the user closers the tab
						Backbone.history.loadUrl('');
					}
				});
			}
            return false;
        }
    });
    return LoginView;
});