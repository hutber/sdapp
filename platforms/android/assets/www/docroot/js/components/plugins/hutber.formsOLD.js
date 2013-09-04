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
        options = options || {};

        //vars
        var doWeHaveAnErrorInTheForm = false,
        $error = $('<span class="error"></span>'),
        $loading = $('<span class="loading">Loading</span>');

        this.each(function () {
            //set up this item
            var $this = $(this),
                me;
            if($this.has('.required')) {
                //on submit do our checks
                $this.submit( function () {
                    doWeHaveAnErrorInTheForm = false;
                    $this.find('span.error').remove();
                    $this.find('.error').removeClass('error');

                    //make email reg ex and error html
                    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


                     // Check passwords match for inputs with class "password"
                    //we need to check this first to stop multiple errors displaying
                    if($('input[type=password]').eq(0).attr('type') === "password"){
                        var password1 = $('input[type=password]').eq(0),
                            password2 = $('input[type=password]').eq(1);

                        //Make sure the passwords match
                        if(password1.val() !== password2.val()){
                            password1.addClass('error').parent().append($error.clone().text('Passwords must match'));
                            doWeHaveAnErrorInTheForm = true;
                        }
                    }

                    //loop through every element that is visible and do the checks on them
                    $this.find($("select:visible,textarea:visible,input:visible")).each(function(){
                        var me = $(this),
                        inputVal = me.val(),
                        errorText;

                        //make sure we aren't empy
                        if(inputVal === ''){
                            me.addClass('error').parent().append($error.clone().text(errorText));
                            doWeHaveAnErrorInTheForm = true;
                        }else{
                            //If we aren't empy make sure we don't have any charater limits set
                            checkCharLength(me, $error);

                            // Run the email validation using the regex for those input items also having class "email"
                            if(me.hasClass('email')){
                                if(!emailReg.test(inputVal)){
                                    me.addClass('error').parent().append($error.clone().text('Enter valid email'));
                                    doWeHaveAnErrorInTheForm = true;
                                }
                            }

                            //Check to see if server side checking is required
                            if (me.hasClass('server')){
                                checkOnline(me);
                            }
                        }

                    });

                    $this.find($('input[type=checkbox]:visible')).each(function(){
                        var me = $(this),
                        errorText;

                        //Set up the error message to be displayed
                        //check to see if we have a custom message, otherwise display the default
                        if(typeof (me.data('error')) === "string"){
                            errorText =  me.data('error');
                        }else{
                            errorText =  "Please don't leave me empty!";
                        }

                        //make sure we we're checked
                        if(!me.is(':checked')){
                            me.addClass('error').parent().append($error.clone().text(errorText));
                            doWeHaveAnErrorInTheForm = true;
                        }
                    });

                    //Now look to see if we have recpacha in this form
                    if($this.find($("#recaptcha_challenge_field")).length>0){
                        hutrecapcha ($this);
                    }

                    //We just check to see if there are fields with an error class
                    if(doWeHaveAnErrorInTheForm){
                        return false;
                    }
                });
            }
        });

        function checkCharLength (me, $error){
            //Check to see if there is a charater limit set
            if(typeof (me.data('to')) !== "undefined" && me.parent().find('span').length===0){
                var from = me.data('from'),
                    to = me.data('to');
                if(me.val() && me.val().length < from || me.val().length > to){
                    me.addClass('error').parent().append($error.clone().text('Character needs to be between '+from+' & '+to));
                    doWeHaveAnErrorInTheForm = true;
                }
            }
        }

        function checkOnline (me){
            var item = me.attr('name'),
                $parentMe = me.parent();
            $parentMe.append($loading);

            $.ajax({
                url:'registration/ajax/'+item,
                data:{"info":me.val()},
                type:'post',
                success:function (data) {
                    $parentMe.find('span').remove();
                    if(parseInt(data,10)>=1){
                        me.addClass('error').parent().append($error.clone().text('Sorry, this '+me.attr('placeholder')+' is taken'));
                        doWeHaveAnErrorInTheForm = true;
                    }

                },
                error:function () {

                }
            });
        }

        function hutrecapcha (currentForm){
            var challengeField = currentForm.find($("#recaptcha_challenge_field")),
                responseField = currentForm.find($("#recaptcha_response_field")),
                html = $.ajax({
                    type:"POST",
                    url:"/recap/ajaxRecaptcha",
                    data:"recaptcha_challenge_field=" + challengeField.val() + "&recaptcha_response_field=" + responseField.val(),
                    async:false
                }).responseText;

            if (html !== "success") {
                Recaptcha.reload();
                responseField.addClass('error');
                doWeHaveAnErrorInTheForm = true;
            }
        }
    };
})(jQuery);
