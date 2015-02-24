munch.factory('ScheduleFactory', function($http){
	var shifts = [];
	var schedules = [];
	var factory = {};
	var staffList = [];

	var logged_in_user = {};
	
	factory.getSchedule=function (callback){
		$http.get('/getSchedule.json').success(function(output){
			schedules=output;
			callback(schedules);
			//Callback needed since controller's $scope runs first;
			//that means that assigning $scope in here would give it 'undefined' as output :(
		});
	}
	factory.getLoggedInUserDB=function(callback){
		$http.get('/getLoggedInUserDB.json').success(function(output){
			logged_in_user=output;
			callback(logged_in_user);
		});
		return logged_in_user;
	}
	factory.removeSchedule = function (remove,callback){
		for(var i = 0; i<schedules.length; i++){
			if(remove._id === schedules[i]._id){
				var newArray = schedules.splice(i,1);
				$http.post('/removeSchedule.json',newArray).success(function(output){
					shifts.push(remove);
					callback(output);
				})
			}
		}
	}
	factory.getPickup = function(callback){
		$http.get('/getPickup.json').success(function(output){
			pickup = output;
			callback(pickup);
		})
	}	
	factory.getShift = function(callback){
		$http.get('/getShift.json').success(function(output){
			shifts = output;
			callback(shifts);
		})
	}
	// factory.retrieveShifts = function(){
	// 	return shifts;
	// }
	factory.takeShift = function(item){
		$http.post('/takeShift.json', item).success(function(output){
			callback(item);
		})
	}
	factory.getTips = function(callback){
		$http.get('/getLoggedInUserDB.json').success(function(output){
			logged_in_user=output;
			callback(logged_in_user);
			$http.get('/getTips.json').success(function(output){
				tips = output;
				callback(tips);
			})
		})
	}
	factory.addTip =  function(tipAmount, username){
		date = new Date();
		$http.post('/addTip.json', {date: date, amount: tipAmount, username:username}).success(function(output){

		})
	}
	factory.getStaffList = function(callback){
		$http.get('/getStaffList.json').success(function(output){
			staff = output
			callback(staff);
		})
	}
	return factory;
})
