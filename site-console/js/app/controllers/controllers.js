define(['angular', 'app/services/services'], function (angular) {
	return angular.module('iWinConsoleApp.controllers', ['iWinConsoleApp.services'])
		.controller('HomeController', ['$scope', '$injector', function ($scope, $injector) {
			require(['app/controllers/home'], function (homeController) {
				$injector.invoke(homeController, this, {'$scope': $scope});
			});
		}]);
});