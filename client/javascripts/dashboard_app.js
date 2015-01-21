//Handles routing among partials and home
var munch=angular.module('munch',['ngRoute']);
munch.config(function($routeProvider){
	$routeProvider
		.when('/',
			{
				templateUrl:'javascripts/partials/navbar_home.html'
			})
		.when('/navbar_home',
			{
				templateUrl:'javascripts/partials/navbar_home.html'
			})
		.when('/schedule',
			{
				templateUrl:'javascripts/partials/schedule.html'
			})
		.when('/menu',
			{
				templateUrl:'javascripts/partials/menu.html'
			})
		.when('/tables',
			{
				templateUrl:'javascripts/partials/tables.html'
			})
		.when('/kitchen',
			{
				templateUrl:'javascripts/partials/kitchen.html'
			})
		.when('/tips',
			{
				templateUrl:'javascripts/partials/tipGraph.ejs'
			})
		.when('/inventory',
			{
				templateUrl:'javascripts/partials/inventory.html'
			})
		.when('/personelle',
			{
				templateUrl:'javascripts/partials/personelle.html'
			})
		.when('/settings',
			{
				templateUrl:'javascripts/partials/settings.html'
			})
		// .when('/learn_more',
		// 	{
		// 		templateUrl:'javascripts/partials/login_learn_more.html'
		// 	})
		// .when('/info',
		// 	{
		// 		templateUrl:'javascripts/partials/login_info.html'
		// 	})
		.otherwise({
			redirectTo:'/'
		});
});