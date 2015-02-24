//Ulysses Lin 1/15/2015

munch.factory('UserFactory',function($http){
	var n=new Date();
	var names=[];
	var orders=[];
	var registration_errors=[];
	var registration_success={status:false};
	var users=[];
	var logged_in_user={username:''};
	var account_type='';
	var dashboard_messages=[];
	//CHANGE THIS WITH DB
	var dashboard_specials=[];
	var scribbles=[];
	var all_personnel=[];
	var factory={};

//----------New----------
	factory.getLoggedInUserDB=function(callback){
		$http.get('/getLoggedInUserDB.json').success(function(output){
			logged_in_user=output;
			callback(logged_in_user);
		});
		return logged_in_user;
	}
	factory.makeNewUser=function(new_user){
		registration_errors.length=0;
		var atpos=new_user.email.indexOf('@');
		var dotpos=new_user.email.lastIndexOf('.');
		if(atpos<1 || dotpos<atpos+2 || dotpos+2>=new_user.email.length){
			registration_errors.push({message:'Please enter a valid email.'});
		}
		if(new_user.password!==new_user.passwordconfirm){
			registration_errors.push({message:'Your passwords do not match.'});
		}
		if(registration_errors.length==0){
			registration_success.status=true;
			var new_user_info={firstname:new_user.firstname,lastname:new_user.lastname,username:new_user.username.toUpperCase(),email:new_user.email,phone:new_user.phone,password:new_user.password,account_type:account_type};
			users.push(new_user_info);
			$http.post('/makeNewUser.json',new_user_info).success(function(output){
				new_user_info={};
			});
		}
	}
	factory.getRegistrationErrors=function(){
		return registration_errors;
	}
	factory.getRegistrationSuccess=function(){
		return registration_success;
	}
	factory.redisplayForm=function(){
		registration_success.status=false;
	}
	factory.selectUserType=function(type){
		account_type=type;
	}

	factory.getNavBar=function(){
		if(logged_in_user.account_type=='team'){
			return {schedule:false,menu:true,tables:true,kitchen:true,tips:false,inventory:false,personnel:false,profile:true};
		}
		if(logged_in_user.account_type=='personal'){
			return {schedule:true,menu:true,tables:false,kitchen:false,tips:true,inventory:false,personnel:false,profile:true};
		}
		if(logged_in_user.account_type=='mgmt'){
			return {schedule:false,menu:true,tables:false,kitchen:false,tips:false,inventory:true,personnel:true,profile:true};
		}
	}
	factory.getDashboardMessages=function(callback){
		$http.get('/getDashboardMessages.json').success(function(output){
			dashboard_messages=output;
			callback(dashboard_messages);
		});
		return dashboard_messages;
	}
	factory.getDashboardSpecials=function(callback){
		$http.get('/getDashboardSpecials.json').success(function(output){
			dashboard_specials=output;
			callback(dashboard_specials);
		});
		return dashboard_specials;
	}
	//Gets scribbles from db; no callback or return as auto-updates should be done through socket, not db saves
	factory.getScribblesDB=function(){
		$http.get('/getScribbles.json').success(function(output){
			scribbles=output;
		});
	}
	//Returns scribbles from factory; the array does NOT get pushed to when new scribbles are submitted
	//New scribbles get broadcasted in routes.js instead
	factory.getScribbles=function(){
		return scribbles;
	}
	factory.makeNewScribble=function(new_scribble){
		var d=new Date();
		$http.post('/makeNewScribble.json',{username:logged_in_user.username,message:new_scribble,date:d.getHours()+':'+d.getMinutes()}).success(function(output){
		});
	}

	//PROFILE
	factory.editProfile=function(user_new_info,password,callback){
		console.log(user_new_info,password);
		$http.post('/editProfile.json',[logged_in_user,password]).success(function(output){
			logged_in_user=output;
			callback(logged_in_user);
		});
		return logged_in_user;
	}

	//PERSONNEL
	factory.getPersonnel=function(callback){
		$http.get('/getPersonnel.json').success(function(output){
			all_personnel=output;
			callback(all_personnel);
		});
		return all_personnel;
	}
	factory.removePersonnel=function(personnel_employee){
		$http.post('/removePersonnel.json',personnel_employee).success(function(output){
		});
	}
	return factory;
});