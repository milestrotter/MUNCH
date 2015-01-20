munch.controller('menusController', function($scope, MenuFactory){
	$scope.menus = MenuFactory.getMenu(function(data){
		// console.log("i am here in the client controller")
	 	$scope.items = data;
	 	$scope.inputs = {
	 		"notes": ['Priority', 'Custom', 'Allergy']
	 	};
		$scope.notes = [];

	 	console.log($scope.items, $scope.inputs, $scope.notes);
	});
	$scope.newOrder = function(data){
		console.log(data);

	}
	$scope.setOutputs = function(index, value){
		if ($scope.notes[index] == null && $scope.notes[index-1] != value && $scope.notes[index] != value) {
			// console.log($scope.notes[index], $scope.notes[index-1])
			$scope.notes[index] = value;
			// console.log($scope.notes.length);
			$scope.showNote = true;
		} else {
			// if(index < $scope.notes.length)
			// 	console.log("I am in the first", "index: ", index, "lenght: ", $scope.notes.length);
			// 	$scope.notes.splice(index, 1);
			// }
			// if ($scope.notes.length == (index)) {
			// 	console.log("I am in the second", "index: ", index, "lenght: ", $scope.notes.length);
			// 	// $scope.notes.splice((index-1), 1);	
			// // } else if($scope.notes.length == (index+2)){
			// // 	console.log("I am in the third", "index: ", index, "lenght: ", $scope.notes.length);
			// // 	$scope.notes.splice((index-2), 1);
			// } else {
			$scope.notes.splice(index, 1);
			console.log($scope.notes.length);
		}
		if ($scope.notes.length < 1) {
			$scope.showNote = false;
		};
		console.log($scope.notes, $scope.showNote);
		// $scope.notes.push(value);
		// console.log($scope.notes);
		// console.log($scope.inputs.notes);
		// console.log(index, value);
		// $scope.inputs.notes.push(value);
		// if ($scope.notes[index]) {
		// 	console.log($scope.notes);
		// } else {
		// 	$scope.notes.push(value);
		// }
		// 	console.log($scope.notes);
	}
	$scope.user = {
    	roles: ['user']
	};

	$scope.checkFirst = function() {
		$scope.user.roles.splice(0, $scope.user.roles.length); 
		$scope.user.roles.push('guest');
	};
});