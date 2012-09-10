//Filename: collections/todos.js

define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'models/todo'
], function(_, Backbone, LocalStorage, todoModel) {
	var TodoCollection = Backbone.Collection.extend({
		model: todoModel,

		localStorage: new LocalStorage('dpb-todos'),

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