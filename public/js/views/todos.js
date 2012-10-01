//Filename: views/todos.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/todos.html',
  'common'
], function($, _, Backbone, todosTemplate, Common){
	var TodoView = Backbone.View.extend({
		tagName: 'li',

		template: _.template(todosTemplate),

		events: {
			"click .toggle": "toggleCompleted",
			"click .destroy": "clear",
			"dblclick label": "edit",
			"blur .edit": "close",
			"keypress .edit": "updateOnEnter"
		},

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
			this.model.on( 'visible', this.toggleVisible, this );
		},

		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));

			this.input = this.$el.find('.edit');

			return this;
		},

		toggleVisible: function() {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function() {
			var complete = this.model.get('completed');

			return (
				(!complete && Common.TodoFilter === 'completed')
				|| (complete && Common.TodoFilter === 'active')
			);
		},

		toggleCompleted: function() {
			this.model.toggleComplete();
		},

		clear: function() {
			this.model.destroy();
		},

		edit: function() {
			this.$el.addClass('editing');
			this.input.focus();
		},

		close: function() {
			var value = this.input.val().trim();

			if (value) {
				this.model.save({title: value});
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		updateOnEnter: function(ev) {
			if (ev.keyCode === Common.ENTER_KEY) {
				this.close();
			}
		}

	});

	return TodoView;
});