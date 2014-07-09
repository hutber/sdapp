/*global define*/
define([
	'dv',
], function () {
    'use strict';

    var LoginView = SD.defaultView.extend({
		el: 'page',

        template: JST['templates/login/login.ejs'],

        render: function () {
            this.$el.html(this.template);
        },
		data: {
			site: SD.liveApp
		},
        events: {
            'submit .loginForm ': 'logUserIn',
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
				SD.spinner.showme();
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
						if(data.status === 200){
							SD.message.showMessage('Opps, sorry just hit login one more time.');
						}else{
							SD.message.showMessage('Sorry Login Failed: '+data.status, 'bad');
						}
						SD.spinner.hideme();
					},
					success: function(data){
						SD.login.doLogin(data);
						SD.spinner.hideme();
					}
				});
			}
            return false;
        }
    });
    return LoginView;
});