define(['angular', 'app/services/services'], function (angular, services) {

	angular.module('iWinConsoleApp.filters', ['iWinConsoleApp.services'])
		.filter('interpolate', ['version', function (version) {
			return function (text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
		}]);
});
