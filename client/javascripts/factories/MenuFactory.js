munch.factory('MenuFactory', function($http){
	var menus = [];
	var orders = [];
	var logged_in_user = {};
	var factory = {};

	factory.getLoggedInUserDB=function(callback){
		$http.get('/getLoggedInUserDB.json').success(function(output){
			logged_in_user = output;
			callback(logged_in_user);
		});
		return logged_in_user
	}
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
	factory.newItem = function(name, description, price, callback){
		// console.log("this is my data", name, description, price);
		var d = new Date();
		data = {name: name, description: description, price: price, date: d}
		menus.push(data);
		console.log(data);
		// console.log(orders);
		$http.post('/newItem.json', data).success(function(output){
			// console.log("hello");
			order = output;
			callback(order);
		})
	}
	factory.removeItem = function(object, callback){
		// console.log("this is my data", name, description, price);
		for(var i = 0; i<menus.length; i++){
			if(object._id === menus[i]._id){
				var newArray = menus.splice(i,1);
				$http.post('/removeItem.json',newArray).success(function(output){
					callback(output);
				})
			}
		}
	}
	factory.updateItem = function(object, callback){
		// console.log("this is my data", name, description, price);
		for(var i = 0; i<menus.length; i++){
			if(object._id === menus[i]._id){
				console.log(object);
				console.log(menus[i]);
				// var newArray = menus.splice(i,1);
				$http.post('/updateItem.json',object).success(function(output){
					callback(output);
				})
			}
		}
	}
	return factory;
})