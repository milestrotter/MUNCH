//Handles routing among partials and home
var munch=angular.module('munch',['ngRoute']);
munch.config(function($routeProvider){
	$routeProvider
		.when('/',
			{
				templateUrl:'javascripts/partials/openShifts.ejs'
			})
		.when('/schedules',
			{
				templateUrl:'javascripts/partials/schedule.ejs'
			})
		.when('/tips',
		{
			templateUrl: 'javascripts/partials/tipGraph.ejs'
		})
		.when('/shifts',
		{
			templateUrl: 'javascripts/partials/openShifts.ejs'
		})
		.otherwise({
			redirectTo:'/'
		});
});
