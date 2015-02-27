//Ulysses Lin 1/15/2015

munch.factory('UserFactory',function($http){
	var n=new Date();
	var names=[];
	var orders=[];
	var registration_errors=[];
	var registration_success={status:false};
	var users=[];
	var logged_in_user={};
	var account_type='';
	var dashboard_messages=[];
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

//MESSAGES
	//Retrieves all existing (and new) dashboard messages
	factory.getDashboardMessages=function(callback){
		$http.get('/getDashboardMessages.json').success(function(output){
			dashboard_messages=output;
			callback(dashboard_messages);
		});
		return dashboard_messages;
	}
	//Creates new dashboard message in db and in factory
	factory.makeNewDashboardMessage=function(new_message){
		var d=new Date();
		$http.post('/makeNewDashboardMessage.json',{message:new_message,username:logged_in_user.username,date:d}).success(function(output){
			//Update the dashboard message list after adding new message to db
			dashboard_messages.push(output);
		});
	}
	factory.deleteDashboardMessage=function(message_id){
		$http.post('/deleteDashboardMessage.json',{id:message_id});
	}

//SPECIALS
	//Retrieves specials from db	
	factory.getDashboardSpecials=function(callback){
		$http.get('/getDashboardSpecials.json').success(function(output){
			dashboard_specials=output;
			callback(dashboard_specials);
		});
		return dashboard_specials;
	}
	//Creates new special in db and in factory
	factory.makeNewDashboardSpecial=function(item,description){
		var d=new Date();
		$http.post('/makeNewDashboardSpecial.json',{item:item,description:description,date:d}).success(function(output){
			dashboard_specials.push(output);
		});
	}
	//Deletes special in db and factory
	factory.deleteDashboardSpecial=function(special_id){
		$http.post('/deleteDashboardSpecial.json',{id:special_id});
		for(special in dashboard_specials){
			if(dashboard_specials[special]['_id']==special_id){
				dashboard_specials.splice(special,1);
			}
		}
	}

//SCRIBBLES
	factory.getScribbles=function(callback){
		$http.get('/getScribbles.json').success(function(output){
			scribbles=output;
			callback(scribbles);
		});
		return scribbles;
	}
	factory.makeNewScribble=function(new_scribble){
		var d=new Date();
		var date=d.toDateString();
		var hours=d.getHours();
		var minutes=d.getMinutes();
		var am_pm='am';
		if(minutes<10){
			minutes='0'+minutes;
		}
		if(hours>12){
			hours-=12;
			am_pm='pm';
		}
		$http.post('/makeNewScribble.json',{fullname:logged_in_user.firstname+' '+logged_in_user.lastname,message:new_scribble,date:hours+':'+minutes+am_pm+', '+date});
			//Do NOT push to 'scribbles';
			//pushing will make new scribbles by you appear above new scribbles from other users 
	}

	//PROFILE
	factory.editProfile=function(user_new_info,password,callback){
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
		$http.post('/removePersonnel.json',personnel_employee);
	}
	factory.editPay=function(personnel_employee){
		$http.post('/editPay.json',personnel_employee);
	}
	return factory;
});