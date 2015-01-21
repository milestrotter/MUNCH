//Ulysses Lin 1/15/2015

munch.factory('CustomerFactory',function($http){
	var n=new Date();
	//Initialize Angular (client side) version of 'names'
	var names=[];
	//Initialize Angular (client side) version of 'orders'
	var orders=[];

	var login_error={message:''};

	var registration_errors=[];

	var registration_success={status:false};

	var users=[];

	//Need to empty username if you want the login stuff to be empty...
	var logged_in_user={username:'Mac Swanson'};

	var account_type='';

	var dashboard_messages=[];

	//CHANGE THIS WITH DB
	var dashboard_specials=[];


	var factory={};

//----------New----------
	factory.getLoginError=function(){
		return login_error;
	}
	factory.login=function(login_info,callback){
		//VALIDATION
		$http.post('/login',login_info).success(function(output){
			if(typeof output=='string'){
				login_error=output;
			}else{
				logged_in_user=output;
			}
			callback(logged_in_user);
		});
		return logged_in_user;
	}
	factory.getLoggedInUser=function(){
		console.log('getLoggedInUser',logged_in_user.username.length);
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
		var to_show={account_type:'personal'};
		if(to_show.account_type=='team'){
			return {schedule:false,menu:true,tables:true,kitchen:true,tips:false,inventory:false,personelle:false,settings:true};
		}
		if(to_show.account_type=='personal'){
			return {schedule:true,menu:true,tables:false,kitchen:false,tips:true,inventory:false,personelle:false,settings:true};
		}
		if(to_show.account_type=='mgmt'){
			return {schedule:false,menu:true,tables:false,kitchen:false,tips:false,inventory:true,personelle:true,settings:true};
		}
	}
	// factory.getDashboardMessages=function(){
	// 	return dashboard_messages;
	// }
	factory.getDashboardMessages=function(callback){
		$http.get('/getDashboardMessages.json').success(function(output){
			dashboard_messages=output;
			callback(dashboard_messages);
		});
		return dashboard_messages;
	}
	factory.getDashboardSpecials=function(callback){
		console.log('getDashboardSpecials');
		$http.get('/getDashboardSpecials.json').success(function(output){
			dashboard_specials=output;
			callback(dashboard_specials);
		});
		return dashboard_specials;
	}



	return factory;
});