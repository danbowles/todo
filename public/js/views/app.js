//Filename: views/app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/todos',
  'views/todos',
  'text!templates/stats.html',
  'common'
], function($, _, Backbone, Todos, TodoView, statsTemplate, Common){
  
	var AppView = Backbone.View.extend({
		el: '#app',

		template: _.template(statsTemplate),

		events: {
			'keypress #new-todo': 'onEnterKey'
		},

		initialize: function() {
			this.input = this.$('#new-todo');

			// Initialize Collection Events
			Todos.on("add", this.addAll, this);
		},

		render: function() {
			console.log("rendered");
		},

		addOne: function(todo) {
			var view = new TodoView({model: todo});
			$("#todo-list").append(view.render().el);
		},

		addAll: function() {
			this.$("#todo-list").html('');

			Todos.each(this.addOne, this);
		},

		onEnterKey: function(ev) {
			if (ev.which !== Common.ENTER_KEY || this.input.val().trim() === '') {
				return;
			}

			Todos.create({
				title: this.input.val().trim(),
				completed: false,
				order: 1
			});

			this.input.val('');
		}
	});
  
  return AppView;
});