munch.factory('MenuFactory', function($http){
	var menus = [];
	var orders = [];
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
	factory.newOrder = function(name, description, index, notes, note, price, qty, callback){
		// console.log("this is my data", data);
		var d = new Date();
		data = {name: name, description: description, index: index, notes: { priority: notes[0], custom: notes[1], allergy: notes[2], notes: note}, price: price, qty: qty, date: d}
		orders.push(data);
		console.log(data);
		// console.log(orders);
		$http.post('/newOrder.json', data).success(data, function(output){
			// console.log("hello");
			order = output;
			callback(order);
		})
	}
	return factory;
})