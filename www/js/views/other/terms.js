define([
	'jquery',
	'underscore',
	'backbone',
	'JST',
	'dsv',
], function ($, _, Backbone, JST) {
	'use strict';

	//set up homeview
	var privacy = SD.defaultView.extend({
		el: 'page',
		events: {
			'click .clear': 'openPriv',
			'click .back': 'closePriv',
		},
		template: JST['templates/login/terms.ejs'],
		openPriv: function(el){
			var target = el.currentTarget.id;
			$('#detail_'+target).show();
			$('body').addClass('itemOpen');
		},
		closePriv: function(el){
			var target = el.currentTarget.attributes[0].nodeValue;
			$('body').removeClass('itemOpen');
			$('#detail_'+target).hide();
		},
		render: function () {
			this.$el.html(this.template);
			SD.setTitle('Privacy');
		},
	});
	return privacy;
});