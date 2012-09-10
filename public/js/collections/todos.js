//Filename: collections/todos.js

define([
  'underscore',
  'backbone',
  'models/todo'
], function(_, Backbone, todoModel) {
	var TodoCollection = Backbone.Collection.extend({
		model: todoModel,

		url: '/todos',

		completed: function() {
			return this.filter(function(todo) {
				return todo.get('completed');
			});
		},

		remaining: function() {
			return this.without.apply(this, this.completed());
		}

	});

	return new TodoCollection();
});