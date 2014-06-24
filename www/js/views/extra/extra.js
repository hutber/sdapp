define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
	'onoff'
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var extra = SD.defaultView.extend({
		el: 'page',
		events: {
		},
		hammerEvents: {
//			'gesture .entry span': 'entrySlide',
			'tap h1': 'handleTap'
		},
		template: JST['templates/extra/extra.ejs'],
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Extra Info');

			//set up slide events
			$('.entry').each(function(myself, el){
				var name = $(this).data('name');
				SD.onoff.instances[name] = new SD.onoff.create($(this));
				SD.onoff.instances[name].checkPrevious();
			});

			$('page').scrollTop(0);
		},
	});
	return extra;
});