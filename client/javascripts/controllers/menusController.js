munch.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

munch.controller('menusController', function($scope, $filter, $http, MenuFactory){
	
	$scope.user = MenuFactory.getLoggedInUserDB(function(data){
		$scope.logged_in_user = data;
		console.log("This is the data: ", $scope.logged_in_user.account_type);
	});

	$scope.menus = MenuFactory.getMenu(function(data){
		// console.log("i am here in the client controller")
	 	$scope.items = data;
	 	$scope.inputs = {
	 		"notes": ['Priority', 'Custom', 'Allergy']
	 	};
		$scope.notes = {};
	 	// console.log($scope.items, $scope.inputs, $scope.notes);
	});
	$scope.newOrder = function(name, description, index, notes, note, price, qty){
		// console.log(data);
		$scope.order = MenuFactory.newOrder(name, description, index, notes, note, price, qty, function(data){
			mydata = data;
			// console.log(mydata);
		});

	}
	$scope.newItem = function(name, description, price){
		// console.log(name, description, price);
		$scope.item = MenuFactory.newItem(name, description, price, function(data){
			mydata = data;
			console.log(mydata);
		});

	}
	$scope.removeItem = function(object){
		// console.log(name, description, price);
		// console.log(object);
		$scope.item = MenuFactory.removeItem(object, function(data){
			mydata = data;
			console.log(mydata);
		});

	}
	$scope.updateMenu = function(object){
		// console.log(name, description, price);
		$scope.item = MenuFactory.updateItem(object, function(data){
			mydata = data;
			console.log(mydata);
		});

	}
	$scope.setOutputs = function(index, value){
		if ($scope.notes[index] == null && $scope.notes[index] != value) {
			$scope.notes[index] = value;
			$scope.showNote = true;
		} else {
			delete $scope.notes[index];
		}
		if (jQuery.isEmptyObject($scope.notes)) {
			$scope.showNote = false;
		};
		// console.log($scope.notes, $scope.showNote);
	}
	$scope.logout = function(){
		$scope.logged_in_user = {};
		return $scope.logged_in_user;
	}
});