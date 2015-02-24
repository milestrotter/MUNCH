//Ulysses Lin 1/15/2015
//Logic for searching, adding, & removing customer names
munch.controller('LoginIntro',function($scope,CustomerFactory){
	$scope.get=function(){
		CustomerFactory.getLoggedInUser();
	}
	$scope.logged_in_user=CustomerFactory.getLoggedInUser();
	$scope.login_error=CustomerFactory.getLoginError();
	$scope.login=function(login_info){
		CustomerFactory.login(login_info,function(data){
			if(typeof data=='string'){
				console.log('got an error when logging in!');
			}else{
				$scope.logged_in_user=data;
				console.log('controller',$scope.logged_in_user);
			}
		});
	}
});
munch.controller('Registration',function($scope,CustomerFactory){
	$scope.tab_clickable=false;
	$scope.toggle_tab_click=function(){
		$scope.tab_clickable=true;
	}
	$scope.makeNewUser=function(new_user){
		CustomerFactory.makeNewUser(new_user);
	}
	$scope.registration_errors=CustomerFactory.getRegistrationErrors();
	$scope.registration_success=CustomerFactory.getRegistrationSuccess();
	$scope.redisplayForm=function(){
		$scope.new_user=null;
		$scope.tab_clickable=false;
		CustomerFactory.redisplayForm();
	}
	$scope.cancel=function(){
		$scope.new_user=null;
		$scope.tab_clickable=false;
	}
	$scope.user_type=function(user_type){
		CustomerFactory.selectUserType(user_type);
	}
});

//DASHBOARD
munch.controller('schedules',function($scope, ScheduleFactory){
	ScheduleFactory.getTips(function(tipdata){
		$scope.tips=tipdata;
	})
});
munch.controller('DashboardNavbar',function($scope,CustomerFactory){
	//loggedin user
	CustomerFactory.getLoggedInUserDB(function(data){
		$scope.logged_in_user=data;
		$scope.navbar_show=CustomerFactory.getNavBar();
	});
});
munch.controller('DashboardMessages',function($scope,CustomerFactory){
	CustomerFactory.getDashboardMessages(function(data){
		$scope.dashboard_messages=data;
	});
	CustomerFactory.getDashboardSpecials(function(data){
		$scope.dashboard_specials=data;
	});
	CustomerFactory.getChalkboardMessages(function(data){
		$scope.chalkboard_messages=data;
	});
	$scope.chalkboard_submit=function(new_scribble){
		CustomerFactory.makeNewScribble(new_scribble);
	}
});
munch.controller('Profile',function($scope,CustomerFactory){
	$scope.profile_save=function(id,password){
		CustomerFactory.editProfile($scope.logged_in_user,password,function(data){
		});
	}
});


//PERSONNEL
munch.controller('Personnel',function($scope,CustomerFactory){
	CustomerFactory.getPersonnel(function(data){
		$scope.personnel_employees=data;
	});
	$scope.personnel_dismiss=function(personnel_employee){
		CustomerFactory.removePersonnel(personnel_employee);
	}
});