/*globals require, Ember, DS, App:true */

/**
 * Main
 */
require.config({
	baseUrl: 'js/',

	paths: {
		lgtm: 'libs/lgtm'
	}
});

Ember.RSVP.configure('onerror', function (error) {
	"use strict";
	Ember.Logger.assert(false, error);
});

Ember.Handlebars.helper('lastFive', function (value) {
	"use strict";

	if (value.length > 10) {
		value = [
			value.substr(0, 5),
			'...',
			value.slice(value.length - 5)
		].join('');
	}

	return value;
});

App = Ember.Application.create({
//    LOG_TRANSITIONS: true,
//    LOG_TRANSITIONS_INTERNAL: true,
//    LOG_VIEW_LOOKUPS: true,
//    LOG_ACTIVE_GENERATION: true
});
App.deferReadiness();

App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api/v1'
});

App.Router.map(function () {
	"use strict";

	this.resource('hipster', function () {
		this.route('add');
		this.route('find');
		this.route('view', { path: ':hipster_id' });
		this.route('edit', { path: ':hipster_id/edit'});
	});
});

require(['templates', 'HipsterRoute'], function () {
	"use strict";

	App.advanceReadiness();
});