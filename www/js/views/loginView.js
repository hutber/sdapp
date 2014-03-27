/*global define*/
define([
	'sd',
	'dv',
], function (SD) {
    'use strict';

    var LoginView = SD.defaultView.extend({
		el: 'page',

        template: JST['app/www/js/templates/login/login.ejs'],

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
						SD.message.showMessage('Sorry Login Failed: '+data.status, 'bad');
						SD.overlay.hideme();
					},
					success: function(data){
						if(data.privateKey){
							localStorage.setItem('privateKey',data.privateKey); //store privateKey in session so it disapears when the user closers the tab
							localStorage.setItem('TOTALSEXNUMBERS',JSON.stringify(data.totalsexnumbers)); //store privateKey in session so it disapears when the user closers the tab
							localStorage.setItem('SEXNUMBERS',JSON.stringify(data.sexnumbers)); //store privateKey in session so it disapears when the user closers the tab
							localStorage.setItem('GLOBALSEXNUMBERS',JSON.stringify(data.globalsexnumbers)); //store privateKey in session so it disapears when the user closers the tab
							localStorage.setItem('sexDetails',JSON.stringify(data.sexDetails)); //store privateKey in session so it disapears when the user closers the tab
							localStorage.setItem('sexesByMonth',JSON.stringify(data.sexesByMonth)); //store privateKey in session so it disapears when the user closers the tab

							//Login successful, lets take you home and remove the pin variable
							window.location.href = "#home";
							sessionStorage.removeItem('appOpenedFirstTime');
							location.reload();
						}else{
							SD.message.showMessage(data.message, 'bad');
						}
						SD.overlay.hideme();
					}
				});
			}
            return false;
        }
    });
    return LoginView;
});