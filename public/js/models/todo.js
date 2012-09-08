//Filename: todo.js

define([
  'underscore',
  'backbone'
], function(_, Backbone){
  
	var TodoModel = Backbone.Model.extend({
		defaults: {
			title: '',
			complete: false
		},

		toggleComplete: function() {
			this.save({
				completed: !this.get('completed')
			});
		}
	});

	return TodoModel;

});