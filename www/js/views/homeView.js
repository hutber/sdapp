define([
	'dv',
	'slider'
], function () {
    'use strict';

	//set up homeview
    var HomeView = SD.defaultView.extend({
		el: 'page',
		events: {

		},
        template: JST[
			'templates/home.ejs'
		],
        render: function () {
			$('body').removeClass('edit');
			SD.setTitle('SELECT SOME SEXYNESS');
			this.$el.html(this.template);

			var sexId = {
				0: 'wank',
				1: 'hands',
				2: 'oral',
				3: 'sex',
				4: 'anything'
			}

			if(typeof jQuery.fn.royalSlider === "function"){
				SD.SLIDER = $('.royalSlider').royalSlider({ //Set up slider
					controlNavigation: 'none',
					arrowsNavHideOnTouch: true,
					globalCaption: true,
					globalCaptionInside: true,
					imageScaleMode: 'fit',
					arrowsNav: false,
					thumbs: {
						arrows: false,
						appendSpan: false,
						firstMargin: false,
						autoCenter: false,
						spacing: 5
					}
				}).data('royalSlider');
//				c(document.getElementById(sexId[SD.SLIDER.currSlideId]));
				//if we have the sex nav open on load select the correct class
				if(SD.SEXDEFAULTS.sextype === "default"){
					$('sexnav div').eq(0).addClass('selected');
				} else{
					//Now navigate to current selection
					SD.SLIDER.goTo($('sexnav div.selected').index());
				}

				SD.SLIDER.ev.on('rsSlideClick', function() { //Add click events to the sex icons
					SD.SEXDEFAULTS = SD.sex.sexDefaults(); //used to reset to default sex
					SD.pageLoad(sexId[SD.SLIDER.currSlideId]);
				});

				SD.SLIDER.ev.on('rsAfterSlideChange', function(event) {
					c('jamie');
					//document.querySelector('sexnav .selected');
//					document.getElementById('nav'+sexId[SD.SLIDER.currSlideId]).setAttribute('class','selected');
//					make sure no elements have any selected items
//					$('sexnav div.selected')[0].removeAttribute('class');
//					$('sexnav div').eq(SD.SLIDER.currSlideId).addClass('selected');
					//update current sex with the class
//					$('div[data-type='+SD.SLIDER.currSlideId+']').addClass('selected');
				});
			}else{
				$('.royalSlider a').each(function(){
					var type = $(this)[0].id,
						copiedContent = $(this).find('anchor').clone(),
						newLink = $('<a href="#'+type+'" ></a>');

					//remove old content
					$(this).remove();
					//add relevent image to copied content
					copiedContent.prepend('<img src="img/sex/full/'+type+'.png" >');
					//Add old content to new link
					newLink.append(copiedContent);
					//Create link
					$('.royalSlider').append(newLink);
				});
			}
        }
    });
    return HomeView;
});