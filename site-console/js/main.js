require.config({
	paths: {
		jquery: 'lib/jquery/jquery',
		angular: 'lib/angular/angular',
		angularRoute: 'lib/angular/angular-route',
		angularMocks: 'lib/angular/angular-mocks',
		text: 'lib/require/text',
		uiBootstrap: 'lib/ui-bootstrap/ui-bootstrap',
		easyXDM: 'lib/easyxdm/easyXDM',
		jqueryStorage: 'lib/jquery/jquery.storageapi',
		iWinGameServices: 'lib/iwin-api/iwinGameServices_v1',
		iWinGameServicesEvent: 'lib/iwin-api/iwinGameServicesEvent_v1',
		iWinGameServicesOAuth: 'lib/iwin-api/iwinGameServicesOAuth_v1',
		iWinGameServicesSupport: 'lib/iwin-api/iwinGameServicesSupport_v1',
		iWinGameServicesUtil: 'lib/iwin-api/iwinGameServicesUtil_v1',
		iWinChatServices: 'lib/iwin-api/iwinChatServices_v2',
	},
	shim: {
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			exports: 'angular.mock'
		},
		uiBootstrap: ['angular'],
		jqueryStorage: ['jquery'],
		iWinGameServicesOAuth: ['jquery'],
		iWinGameServicesEvent: ['jquery'],
		iWinGameServicesUtil: ['jquery'],
		iWinGameServices: ['iWinGameServicesOAuth', 'iWinGameServicesEvent', 'iWinGameServicesUtil', 'jqueryStorage'],
		iWinGameServicesSupport: ['iWinGameServices'],
		iWinChatServices: ['jquery'],
	},
	priority: [
		'angular'
	],
	config: {
		text: {
			useXhr: function (url, protocol, hostname, port) {
				// allow cross-domain requests
				// remote server allows CORS
				return true;
			}
		}
	}
});

//http://code.angularjs.org/1.2.14/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
	'angular',
	'app/app',
	'uiBootstrap',
	'app/services/routes',
	'iWinGameServices',
	'iWinGameServicesSupport',
	'iWinChatServices',
	'easyXDM'
], function (angular, app) {
	angular.element().ready(function () {
		angular.resumeBootstrap([app['name']]);
	});
});