//Filename: routers/router.js

define([
  'jquery',
  'backbone',
  'collections/todos',
  'common'
], function($, Backbone, Todos, Common){
  
	var AppRouter = Backbone.Router.extend({
		routes: {
			"*filter": "setFilter"
		},

		setFilter: function(filter) {
			Common.TodoFilter = filter.trim() || '';

			Todos.trigger('filter');
		}
	});
  
	return AppRouter;

});