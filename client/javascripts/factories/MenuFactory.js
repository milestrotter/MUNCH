munch.factory('MenuFactory', function($http){
	var menus = [];
	var factory = {};
	factory.getMenu = function (callback){
		console.log("I am in the getMenu factory");
		$http.get('/getMenu').success(function(output){
			menus = output;
			callback(menus);
			//Callback needed since controller's $scope runs first;
			//that means that assigning $scope in here would give it 'undefined' as output :(
		});
		return menus;
	},

	factory.removeMenuItem = function (remove, callback){
		for(var i = 0; i < menus.length; i++){
			if(remove._id === menus[i]._id){
				var newArray = menus.splice(i, 1);
				$http.post('/removeMenuItem.json', newArray).success(function(output){
					callback(output);
				})
			}
		}
	}
	// factory.getShift = function(callback){
	// 	$http.get('/getShift.json').success(function(output){
	// 		shifts = output;
	// 		callback(shifts);
	// 	})
	// }
	return factory;
})