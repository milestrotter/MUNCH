//Handles routing among partials and home
var munch=angular.module('munch',['ngRoute']);
munch.config(function($routeProvider){
	$routeProvider
		// .when('/',
		// 	{
		// 		templateUrl:'javascripts/partials/other.html'
		// 	})
		.when('/learn_more',
			{
				templateUrl:'javascripts/partials/login_learn_more.html'
			})
		.when('/info',
			{
				templateUrl:'javascripts/partials/login_info.html'
			})
		.when('/tips',
			{
				templateUrl:'javascripts/partials/tipGraph.ejs'
			})
		.otherwise({
			redirectTo:'/'
		});
});