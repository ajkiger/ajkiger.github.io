define([
	'angular',
	'angularRoute',
	'app/filters/filters',
	'app/services/services',
	'app/directives/directives',
	'app/controllers/controllers'
],
	function (angular, ngRoute, filters, services, directives, controllers) {
		return angular.module('iWinConsoleApp', [
			'ngRoute',
			'ui.bootstrap',
			'iWinConsoleApp.filters',
			'iWinConsoleApp.services',
			'iWinConsoleApp.directives',
			'iWinConsoleApp.controllers'
		]);
	});






