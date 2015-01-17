//Ulysses Lin 1/15/2015
//Logic for searching, adding, & removing customer names
munch.controller('LoginIntro',function($scope,CustomerFactory){

});
munch.controller('Customer',function($scope,CustomerFactory){
	//Sets db data as $scope.orders from Ajax call; gets existing db data
	CustomerFactory.getOrders(function(data){
		$scope.orders=data;
	});
	//Sets db data as $scope.names from Ajax call; gets existing db data
	CustomerFactory.compileCustomers(function(data){
		$scope.names=data;
	});
	//makeNewCustomer is a function in the partial
	$scope.makeNewCustomer=function(name){
		CustomerFactory.makeNewCustomer(name);
	}
	$scope.removeCustomer=function(order){
		CustomerFactory.removeCustomer(order);
	}
});
//Logic for searching, adding, & removing order information
munch.controller('Order',function($scope,CustomerFactory){
	CustomerFactory.getOrders(function(data){
		$scope.orders=data;
	});
	CustomerFactory.compileCustomers(function(data){
		$scope.names=data;
	});
	//getItems is a simple variable in the partial
	$scope.items=CustomerFactory.getItems();
	$scope.makeNewOrder=function(name,quantity,item){
		CustomerFactory.makeNewOrder(name,quantity,item);
	}
	$scope.makeNewItem=function(item){
		CustomerFactory.makeNewItem(item);
	}
	$scope.removeOrder=function(order){
		CustomerFactory.removeOrder(order);
	}
});
//Logic for error message
munch.controller('Wrong',function($scope,CustomerFactory){
	$scope.item_wrong=CustomerFactory.getItemError();
	$scope.customer_wrong=CustomerFactory.getCustomerError();
});