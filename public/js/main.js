// Filename: main.js

require.config({
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: 'libs/jquery/jquery.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text'
	}
});

require([
	'views/app',
	'routers/router'
], function(AppView, AppRouter) {
	// Initialize Router, History
	new AppRouter();
	Backbone.history.start();

	// Create AppView
	new AppView();
});