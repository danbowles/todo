//Filename: routers/router.js

define([
  'jquery',
  'backbone'
], function($, Backbone, todoViewList){
  
	var AppRouter = Backbone.Router.extend({
		routes: {
			"test": "yea"
		},

		yea: function() {}
	});
  
	return AppRouter;

});