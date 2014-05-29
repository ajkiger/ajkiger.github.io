define(['angular', '../app'], function (angular, app) {
	return app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:game', {
			templateUrl: 'site-console/views/home.html',
			controller: 'HomeController'
		});
		$routeProvider.otherwise({redirectTo: '/game'});
	}]);
});