//Ulysses Lin 1/15/2015

munch.factory('CustomerFactory',function($http){
	var n=new Date();
	//Initialize Angular (client side) version of 'names'
	var names=[];
	//Initialize Angular (client side) version of 'orders'
	var orders=[];
	//Intialize existing item types
	//NOTE: item types not stored in db...sorry :(
	var tally=[
		{item_name:'Nike shoes'},
		{item_name:'Black belts'},
		{item_name:'Ice cream cones'},
		{item_name:'Candles'}
	];
	//Error(s) for new item entry
	var item_error={message:''};
	//Error(s) for new customer (person name) entry
	var customer_error={message:''};
	//Create factory object
	var factory={};

//----------ITEMS----------
	factory.getItems=function(){
		return tally;
	}
	factory.getItemError=function(){
		return item_error;
	}
	//Adds a new item type
	factory.makeNewItem=function(new_item){
		//Throw error if entry is blank
		if(typeof new_item=='undefined'){
			item_error.message='Please enter a valid name!';
			return false;
		}
		//Throw error if item type exists
		for(item in tally){
			if(tally[item].item_name==new_item){
				item_error.message='That name is already in the list!';
				return false;
			}
		}
		item_error.message='';
		tally.push({item_name:new_item});
		return true;
	}

//----------CUSTOMERS----------
	factory.compileCustomers=function(callback){
		$http.get('/getCustomers.json').success(function(output){
			names=output;
			callback(names);
		});
		return names;
	}
	factory.getNames=function(){
		return names;
	}
	factory.getCustomerError=function(){
		return customer_error;
	}
	//Makes a new customer name
	factory.makeNewCustomer=function(entered_name){
		//Throw error if entry is blank
		if(typeof entered_name=='undefined'){
			customer_error.message='Please enter a valid name!';
			return false;
		}
		//Throw error if item type exists
		for(person_name in names){
			if(names[person_name].name==entered_name){
				customer_error.message='That name is already in the list!';
				return false;
			}
		}
		customer_error.message='';
		var d=new Date();
		names.push({name:entered_name,date:d});
		$http.post('/makeNewCustomer.json',{name:entered_name,date:d}).success(function(output){
		});
	}
	//Finds 'customer' object in data; deletes from data
	factory.removeCustomer=function(to_delete){
		names.splice(names.indexOf(to_delete),1);
		$http.post('/removeCustomer.json',to_delete).success(function(output){
		});
	}

//----------ORDERS----------
	//Grabs orders from 'orders' collection/db
	factory.getOrders=function(callback){
		$http.get('/getOrders.json').success(function(output){
			orders=output;
			//Callback needed since controller's $scope runs first;
			//that means that assigning $scope in here would give it 'undefined' as output :(
			callback(orders);
		});
		return orders;
	}
	//Creates a new order
	factory.makeNewOrder=function(name,quantity,item){
		var d=new Date();
		orders.push({name:name,item:item,quantity:quantity,date:d});
		$http.post('/makeNewOrder.json',{name:name,item:item,quantity:quantity,date:d}).success(function(output){
		});
	}
	//Finds 'order' object in data; deletes from data
	factory.removeOrder=function(to_delete){
		orders.splice(orders.indexOf(to_delete),1);
		$http.post('/removeOrder.json',to_delete).success(function(output){
		});
	}

	return factory;
});