/**
 * Created with JetBrains PhpStorm.
 * User: Hutber
 * Date: 21/04/13
 * Time: 22:11
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    "use strict"; //For good development standards :)

    $.fn.autocompletefullscreen = function (options) {

        options = options || {};        //If option has not been set as a paramater set it here

        var auto = {};

        auto.Globals = {
            $error:$('<span class="error"></span>'),
            $loading:$('<span class="loading">Loading</span>')
        };

        auto.init = function(){
            $(document).keyup(function(e) {
                if (e.keyCode === 13) {
                    var active = auto.resultsList.find('.active');
                    if(active.length){
                        auto.select.save(active);
                    }else{
                        auto.select.save($('.displaysearch:visible'));
                    }
                }     // enter
                if (e.keyCode === 27) {auto.ui.close();}   // esc
            });
        };

        auto.itemInit = function(me, position){
            //Set up variables for each search box
            auto.myself = me;

            auto.myself.attr('data-position',position);

            //set the position globally
            auto.position = position;

            //set up all new elements needed
            auto.markup.init();

            //set up global seceltors
            auto.hiddenContent = $("#searchitem_"+position),
            auto.displaySearch = $("#displaysearch_"+position),
            auto.searchOverlay = $("#overlay"),
            auto.resultsList = $("#resultsitems_"+position);

            //set up ajax request
            auto.ajax.init();

            //set up events
            auto.ui.init();

            //set up search results to be clickable
            auto.select.init();
        };

        auto.ui = {
            init:function(){
                this.open();

                //click events
                auto.hiddenContent.on('click','.close', function(){
                    auto.ui.close();
                });
            },
            open: function(){
                auto.myself.on('click', function(){
                    var position = $(this).data('position');
                    auto.myself = $(this);

                    //redeclare all vars on click
                    auto.hiddenContent = $("#searchitem_"+position),
                    auto.displaySearch = $("#displaysearch_"+position),
                    auto.searchOverlay = $("#overlay"),
                    auto.resultsList = $("#resultsitems_"+position);

                    auto.searchOverlay.show();
                    auto.hiddenContent.show();
                    auto.displaySearch.focus(); //give the hidden input box focus
                });
            },
            close: function(){
                auto.searchOverlay.hide();
                auto.hiddenContent.hide();
            }
        };

        auto.select = {
            init: function(){
                auto.resultsList.on('click', 'li', function(){
                    auto.select.save($(this));
                });
            },
            save: function (me){
                var value = me.val(),
                    text = me.text();
                if(value===0){
                    auto.myself.val(text);
                }else{
                    auto.myself.val(value);
                }
                auto.ui.close();
            }
        };

        auto.ajax = {
            init: function (){
                var latestQuery;
                auto.displaySearch.keyup(function(m){
                    if (m.keyCode !== 38 && m.keyCode !== 40) {   // esc
//                    if(m.ctrlKey === true && m.keyCode !== 65){ //Lets put some safey checks in!
                        var currentQuery = auto.displaySearch.val(); //get the current value of the search input
//                        if(currentQuery.length>=4){
                            auto.displaySearch.val(currentQuery); //...update the search input value with the latest query
                            auto.ajax.call($(auto.myself).data('url')+currentQuery); //...update the results
//                        }
//                    }
                    }else{
                        var wherearewe = auto.resultsList.find('li');
                        var active = auto.resultsList.find('li.active');
                        if(m.keyCode === 38){//Check Keyup
                            if(active.length && active.index()===0){ //check is there an active state and is that index on the first LI of the menu
                                wherearewe.eq(wherearewe.length-1).addClass('active');
                            }else{
                                active.prev().addClass('active');
                            }
                        }
                        if(m.keyCode === 40){//Keydown
                            if(!active.length || active.index()+2>wherearewe.length){ //Make sure there is no active on the menu OR if the active REAL index larger than the ammount of items currently displaying.
                                wherearewe.eq(0).addClass('active');
                            }else{
                                active.next().addClass('active');
                            }
                        }
                        active.removeClass('active'); //now remove the old active
                    }
                });
            },
            call: function(queryString){
                if(queryString.length > 0){ //if there is a query to process...
                    $.ajax({
                        url:queryString,
                        success: auto.ajax.success
                    });
                }else{
                    auto.resultsList.html("<li>No results</li>");
                }
            },
            success: function(data){ //..send that query to the php script "auto-suggest.php" via ajax
                if(data.length > 0){ //if the php script returns a result...
                    data = $.parseJSON(data); //turn the string from the PHP script into a JavaScript object
                    $('#resultsitems_'+auto.position+' li').remove(":contains('No results')"); //remove the "No results" text if it's being displayed
                    $('#results_'+auto.position).show(); //show the results container

                    var previousTerms = []; //set up an array that will hold the terms currently being displayed
                    $('#resultsitems_'+auto.position+' li').each(function(){ //for each result currently being displayed...
                        previousTerms.push($(this).text()); //add it to the previousTerms array
                    });

                    auto.resultsList.empty();
//                    var name, person;
//                    for (person in data) {
//                        for (name in data[person]) {
//                            console.log(data[person][name]);
//                        }
//                    }
                    data.forEach(function(m){
                        var item = Object.keys(m)[0];
                        auto.resultsList.prepend('<li>'+ m[item]+'</li>');
                    });
                }
            }
        };

        auto.markup = {
            init: function(){
                this.setUpElements();
            },
            setUpElements: function(){
                //set up root div
                $('<div class="searchcontainer" id="searchitem_'+auto.position+'" />').appendTo($('#overlay'));
                //add both search fields requireda
                $('#searchitem_'+auto.position).html('<h2>Begin typing to search</h2>' +
                '<div class="close">X</div>' +
                    '<input class="displaysearch" id="displaysearch_'+auto.position+'" type="text" autocomplete="off" /> <!--mirrored input that shows the actual input value-->'+
                    '<input id="cords_displaysearch_'+auto.position+'" type="hidden" autocomplete="off" />'+
                '<div class="results" id="results_'+auto.position+'">'+
                    '<h2 class="resultsheader" id="resultsheader_'+auto.position+'">Results</h2>'+
                    '<ul id="resultsitems_'+auto.position+'"></ul>'+
                '</div>');
            }
        };

        var i = 1;
        return this.each(function () {
            if(i===1){
                auto.init();
            }

            auto.itemInit ($(this),i);
            i+=1;
        });

    };
})(jQuery);