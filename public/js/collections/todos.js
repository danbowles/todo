//Filename: collections/todos.js

define([
  'underscore',
  'backbone',
  'models/todo'
], function(_, Backbone, todoModel) {
	var TodoCollection = Backbone.Collection.extend({
		model: todoModel,

		url: '/todos'
	});

	return new TodoCollection();
});