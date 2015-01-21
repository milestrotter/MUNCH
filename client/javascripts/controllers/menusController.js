munch.controller('menusController', function($scope, $filter, $http, MenuFactory){
	$scope.menus = MenuFactory.getMenu(function(data){
		// console.log("i am here in the client controller")
	 	$scope.items = data;
	 	$scope.inputs = {
	 		"notes": ['Priority', 'Custom', 'Allergy']
	 	};
		$scope.notes = {};

		$scope.user = {
		  name: 'awesome user'
		};

	 	console.log($scope.items, $scope.inputs, $scope.notes);
	});
	$scope.newOrder = function(name, description, index, notes, note, price, qty){
		// console.log(data);
		$scope.order = MenuFactory.newOrder(name, description, index, notes, note, price, qty, function(data){
			mydata = data;
			// console.log(mydata);
		});

	}
	$scope.updateMenu = function(name, description, price){
		console.log(name, description, price);
		// $scope.order = MenuFactory.newOrder(name, description, price, function(data){
		// 	mydata = data;
		// 	console.log(mydata);
		// });

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
	$scope.user = {
    id: 1,
    name: 'awesome user',
    status: 2,
    group: 4,
    groupName: 'admin'
  };
});