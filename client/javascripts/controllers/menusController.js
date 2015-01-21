munch.controller('menusController', function($scope, MenuFactory){
	$scope.menus = MenuFactory.getMenu(function(data){
		// console.log("i am here in the client controller")
	 	$scope.items = data;
	 	$scope.inputs = {
	 		"notes": ['Priority', 'Custom', 'Allergy']
	 	};
		$scope.notes = {};

	 	console.log($scope.items, $scope.inputs, $scope.notes);
	});
	$scope.newOrder = function(name, description, index, notes, note, price, qty){
		// console.log(data);
		$scope.order = MenuFactory.newOrder(name, description, index, notes, note, price, qty, function(data){
			mydata = data;
			// console.log(mydata);
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
});