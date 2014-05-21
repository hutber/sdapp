define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var entry = SD.defaultView.extend({
		el: 'page',
		events: {
			'keyup textarea': 'countString',
		},
		template: JST['templates/diary/diary.ejs'],
		countString: function(me){
			var stringNumber = me.target.value.length,
				diaryString = me.target.value;
			if(stringNumber < 256){
				$('.info span').html(stringNumber);
				SD.SEXDEFAULTS.diary = me.target.value;
			}else{
				me.target.value = diaryString.substr(0,me.target.value.length-1)
			}

		},
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Diary Entry');
		},
	});
	return entry;
});