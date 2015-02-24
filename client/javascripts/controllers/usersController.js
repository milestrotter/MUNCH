//Ulysses Lin 1/15/2015
//Logic for searching, adding, & removing customer names
munch.controller('Registration',function($scope,UserFactory){
	$scope.tab_clickable=false;
	$scope.toggle_tab_click=function(){
		$scope.tab_clickable=true;
	}
	$scope.makeNewUser=function(new_user){
		UserFactory.makeNewUser(new_user);
	}
	$scope.registration_errors=UserFactory.getRegistrationErrors();
	$scope.registration_success=UserFactory.getRegistrationSuccess();
	$scope.redisplayForm=function(){
		$scope.new_user=null;
		$scope.tab_clickable=false;
		UserFactory.redisplayForm();
	}
	$scope.cancel=function(){
		$scope.new_user=null;
		$scope.tab_clickable=false;
	}
	$scope.user_type=function(user_type){
		UserFactory.selectUserType(user_type);
	}
});

//DASHBOARD
munch.controller('schedules',function($scope, ScheduleFactory){
	ScheduleFactory.getTips(function(tipdata){
		$scope.tips=tipdata;
	})
});
munch.controller('DashboardNavbar',function($scope,UserFactory){
	UserFactory.getScribblesDB();
	//loggedin user
	UserFactory.getLoggedInUserDB(function(data){
		$scope.logged_in_user=data;
		$scope.navbar_show=UserFactory.getNavBar();
	});
});
munch.controller('DashboardMessages',function($scope,UserFactory){
	UserFactory.getDashboardMessages(function(data){
		$scope.dashboard_messages=data;
	});
	UserFactory.getDashboardSpecials(function(data){
		$scope.dashboard_specials=data;
	});
	$scope.scribbles=UserFactory.getScribbles();
	$scope.chalkboard_submit=function(new_scribble){
		UserFactory.makeNewScribble(new_scribble);
	}
});
munch.controller('Profile',function($scope,UserFactory){
	$scope.profile_save=function(id,password){
		UserFactory.editProfile($scope.logged_in_user,password,function(data){
		});
	}
});


//PERSONNEL
munch.controller('Personnel',function($scope,UserFactory){
	UserFactory.getPersonnel(function(data){
		$scope.personnel_employees=data;
	});
	$scope.personnel_dismiss=function(personnel_employee){
		UserFactory.removePersonnel(personnel_employee);
	}
});