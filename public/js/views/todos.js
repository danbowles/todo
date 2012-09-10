//Filename: views/todos.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/todos.html'
], function($, _, Backbone, todosTemplate){
	var TodoView = Backbone.View.extend({
		tagName: 'li',

		template: _.template(todosTemplate),

		events: {
			"click .toggle": "toggleCompleted",
			"click .destroy": "clear"
		},

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));

			return this;
		},

		toggleCompleted: function() {
			this.model.toggleComplete();
		},

		clear: function() {
			this.model.destroy();
		}

	});

	return TodoView;
});