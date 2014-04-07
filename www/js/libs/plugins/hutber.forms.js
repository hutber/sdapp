/**
 * Created with JetBrains PhpStorm.
 * User: Hutber
 * Date: 18/01/13
 * Time: 21:46
 * Forms plugin
 */
(function ($) {
    "use strict"; //For good development standards :)

    $.fn.forms = function (options) {
        var options = options || {};

        var form = {};

        form.Globals = {
			fresh: true,
            $error:$('<span class="error"></span>'),
            $loading:$('<span class="loading">Loading</span>')
        };

        form.init = function(me){
            form.init.myself = me,
            form.init.mainItems = me.find($("select:visible,textarea:visible,input[type=text]:visible,input[type=password]:visible,input[type=email]:visible")),
            form.init.checkBoxItems = me.find($("input[type=checkbox]:visible"));
            form.items.init();
            form.actions();

			// #Set up events to check
        };

        form.actions = function(){
            form.init.myself.submit( function (m) {
                form.init.mainItems.each(function(){
                    form.items.main($(this), false);
                });
				form.init.checkBoxItems.each(function(){
					form.items.checkboxes($(this), false);
				});
                return form.validation.formWide();
            });
        };

        form.validation = {
            formWide:function(){
                if (form.init.myself.find('.error').length > 0){
                    return false;
                }
            },
            errorText:function(myself){
                //Set up the error message to be displayed
                //check to see if we have a custom message, otherwise display the default
                if(typeof (myself.data('error')) === "string"){
                    return myself.data('error');
                }else{
                    return "Please don't leave me empty!";
                }
            },
            checkCharLength:function (me){
                //Check to see if there is a character  limit set
                if(typeof (me.data('to')) !== "undefined" && me.parent().find('span').length===0){
                    var from = me.data('from'),
                        to = me.data('to');
                    if(me.val() && me.val().length < from || me.val().length > to){
                        me.addClass('error').parent().append(form.Globals.$error.clone().text('Character needs to be between '+from+' & '+to));
                    }
                }
            },
            errorMe:function(myself){
                return myself.parent().find('span').length;
            }
        };

        form.items = {
            init:function(){
                this.call();
            },
            call:function(){
                //Check all visible elements
                form.init.mainItems.each(function(){
                    $(this).change(function(){
                        form.items.main($(this), true);
                    });
                    $(this).keyup(function(){
                        form.items.main($(this), true);
                    });
					$(this).click(function(){
						form.items.main($(this), true);
					});
                });
				form.init.checkBoxItems.each(function(){
					$(this).click(function(){
						form.items.checkboxes($(this), true);
					});
				});

//                //Check Checkboxes
//                form.init.myself.find($('input[type=checkbox]:visible')).each(function(){
//                });
            },
            main:function(myself, submit){
                var inputVal = myself.val(),
                    errorText = form.validation.errorText(myself),
                    //make email reg ex and error html
                    emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if(myself.hasClass('required') || typeof myself.attr('required')!=="undefined" || options.required !=="") {
                    //remove the previous error before we add it
                    myself.removeClass('error').parent().find('span').remove();

                    // Check passwords match for inputs with class "password"
                    //we need to check this first to stop multiple errors displaying
                    if(myself.attr('type') === "password"){
                        var passwords = $('input[type=password]', form.init.myself),
                            password1 = passwords.eq(0),
                            password2 = passwords.eq(1);


                        //Make sure the passwords match
                        if(password1.val() !== password2.val()){
                            passwords.removeClass('error').parent().find('span').remove();
                            if(form.validation.errorMe(myself)!==1)
                               myself.addClass('error').parent().append(form.Globals.$error.clone().text('Passwords must match'));
                        }
                    }
                    //make sure we aren't empty and that we have previously written on it.
                    if(inputVal.length===0 && myself.hasClass('previous')){
                        if(form.validation.errorMe(myself)===0){
                            myself.addClass('error').parent().append(form.Globals.$error.clone().text(errorText));
                        }
                    }else{
                        //If we aren't empy make sure we don't have any charater limits set
                        form.validation.checkCharLength(myself);

                        // Run the email validation using the regex for those input items also having class "email"
                        if(myself.hasClass('email')){
                            if(!emailReg.test(inputVal)){
                                myself.addClass('error').parent().append(form.Globals.$error.clone().text('Enter valid email'));
                            }
                        }
                    }
                    //If we have no error on the page check if the item needs ajax verification
                    if(form.validation.errorMe(myself)===0 && myself.hasClass('server') && form.ajaxEvents.ajaxTimer !== null && submit){
                        clearTimeout(form.ajaxEvents.ajaxTimer);
                        form.ajaxEvents.ajaxTimer = setTimeout(function(){form.ajaxEvents.call(myself);}, form.ajaxEvents.ajaxTimerSetting);
                    }

					//add that we have written on this before
					myself.addClass('previous')
                }
            },
			checkboxes: function(myself){
				var dad = myself.parent();
				dad.removeAttr('class');
				if(myself.prop('checked') === false){
					dad.addClass('error');
				}
			}
        };

        form.ajaxEvents = {
            ajaxTimerSetting:750,
            ajaxTimer:true,
            call:function(me){
                var item = me.attr('name'),
                $parentMe = me.parent(),
                ajaxLocation = me.data('ajaxlocation');
                $parentMe.append(form.Globals.$loading);

                if(ajaxLocation==="undefined") {
                    ajaxLocation = '/ajax/';
                }

                //turn off so we wait for ajax to complete
//                me.attr('disabled','disabled');

                $.ajax({
                    url:ajaxLocation+item,
                    data:{"info":me.val()},
                    type:'post',
                    success:function (data) {
                        $parentMe.find('span').remove();
//                        me.removeAttr('disabled');
                        if(parseInt(data,10)>=1){
                            me.addClass('error').parent().append(form.Globals.$error.clone().text('Sorry, this '+me.attr('placeholder')+' is taken'));
                        }

                    },
                    error:function () {

                    }
                });
            }
        };

        this.each(function () {
            form.init($(this));
        });


    };
})(jQuery);
