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
			'keypress #new-todo': 'onEnterKey',
			'click #clear-completed': 'clearCompleted'
		},

		initialize: function() {
			this.input = this.$('#new-todo');
			this.$footer = this.$("#footer").hide();
			this.$clearBtn = this.$("#clear-completed");
			// Initialize Collection Events
			Todos.on("add", this.addAll, this);
			Todos.on("all", this.render, this);
		},

		render: function() {
			var completed = Todos.completed().length,
				remaining = Todos.remaining().length;
			if (Todos.length) {
				this.$footer.show();

				this.$footer.html(this.template({
					completed: completed,
					remaining: remaining
				}));
			} else {
				this.$footer.hide();
			}
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
		},

		clearCompleted: function() {
			_.each(Todos.completed(), function(todo) {
				todo.destroy();
			});
			return false;
		}
	});
  
  return AppView;
});