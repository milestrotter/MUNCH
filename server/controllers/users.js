//Ulysses Lin 1/15/15
//NOTE: This file is called 'orders.js' but it deals with the 'orders' AND 'customers' collections/dbs
var mongoose = require('mongoose')
var User = mongoose.model('User');
var DashboardMessage = mongoose.model('DashboardMessage');
var DashboardSpecial = mongoose.model('DashboardSpecial');
var Scribble = mongoose.model('Scribble');

//Chris
var Schedule = mongoose.model('Schedule');
var Shift = mongoose.model('Shift');
var Tip = mongoose.model('Tip');
var User = mongoose.model('User');
var Pickup = mongoose.model('Pickup')

var logged_in_user = {};

module.exports = {
    index: function(request, response) {
        //Clear out all dbs at start
        //NOTE COMMENT OUT THE .remove LINES IF YOU WANT THE DB TO REMEMBER INFO
        User.remove({},function(err,removed){});
        DashboardMessage.remove({},function(err,removed){});
        DashboardSpecial.remove({},function(err,removed){});
        // Scribble.remove({},function(err,removed){});

        Tip.remove({},function(err,removed){});

        //Chris
        Schedule.create({title: "Bartending", start: "2015-01-21T08:00:00", end: "2015-01-21T15:00:00",staff: "BLAKE"});
        Schedule.create({title: "Bartending", start: "2015-01-22T08:00:00", end: "2015-01-22T15:00:00",staff: "BLAKE"});
        Schedule.create({title: "Bartending", start: "2015-01-23T08:00:00", end: "2015-01-23T15:00:00",staff: "BLAKE"});
        Shift.create({title: "Bartending", start: "2015-01-25", end: "2015-01-23",staff: ""});
        Shift.create({title: "Serving Section A", start: "2015-01-26", end: "2015-01-26",staff: ""});
        Tip.create({date: "2015-01-14", amount: "55.60", username: "BLAKE"});
        Tip.create({date: "2015-01-15", amount: "70.60", username: "BLAKE"});
        Tip.create({date: "2015-01-16", amount: "60.60", username: "BLAKE"});
        Tip.create({date: "2015-01-17", amount: "44.60", username: "BLAKE"});

        //Initialize 'users' collection
        var d=new Date();
        d=d.toDateString();
        User.create({firstname:'Anders',lastname:'Holmvik',username:'DERS',email:'DJango@yahoo.com',phone:'555-555-5555',password:'1',account_type:'mgmt'});
        User.create({firstname:'Blake',lastname:'Anderson',username:'BLAKE',email:'poppy@gmail.com',phone:'444-444-4444',password:'2',account_type:'personal'});
        User.create({firstname:'Adam',lastname:'DeMamp',username:'ADAM',email:'dude@msn.com',phone:'333-333-3333',password:'3',account_type:'personal'});
        User.create({firstname:'-',lastname:'-',username:'TEAM',email:'team@restaurant.com',phone:'222-222-2222',password:'4',account_type:'team'});

        DashboardMessage.create(
            {message:'Clean up that stuff on the floor, what is that even',username:'DERS',date:d},
            {message:'Need more beer, now!',username:'DERS',date:d},
            {message:'You all gonna be fired',username:'DERS',date:d});
        DashboardSpecial.create(
            {item:'Goop',description:'Pretty awful stuff actually'},
            {item:'Cookies',description:'2 cookies baked to mediocrity'});
        //NOTE: UNCOMMENT NEXT TWO LINES IF NEED TO REINITIALIZE SCRIBBLES
        // Scribble.create({username:'DERS',message:'No floor cleaning today.',date:'12:22'});
        // Scribble.create({username:'Adam',message:'Where are those hot dogs??',date:'12:25'});

        //Render Login/Registration view page
        response.render('../../client/views/login',{ title:'MUNCH',error:'' });
    },
    goToDashboard: function(request, response) {
        response.render('dashboard',{ title:'DASHBOARD',username:logged_in_user.username });
    },
    login: function(request, response){
        User.findOne({username:request.body.username.toUpperCase()},function(err,db_found_user){
            if(db_found_user==null){
                response.render('login',{ title:'MUNCH',error:'User not found.' });
            }else{
                if(request.body.password!==db_found_user.password){
                    response.render('login',{ title:'MUNCH',error:'Incorrect password.' });
                }else{
                    logged_in_user=db_found_user;
                    response.redirect('/dashboard');
                }
            }
        });
    },
    makeNewUser: function(request, response) {
        a = new User(request.body);
        a.save(function(err) {
            if (err) {
                response.send(JSON.stringify(err));
            } else {
                console.log('success: created new User');
            }
        });
    },
    getLoggedInUserDB: function(request, response) {
        response.send(logged_in_user);
    },
    getDashboardMessages: function(request, response) {
        DashboardMessage.find({},function(err,db_dashboard_messages){
            response.send(db_dashboard_messages);
        });
    },
    getDashboardSpecials: function(request, response) {
        DashboardSpecial.find({},function(err,db_dashboard_specials){
            response.send(db_dashboard_specials);
        });
    },
    getScribbles: function(request, response) {
        Scribble.find({},function(err,db_scribbles){
            response.send(db_scribbles);
        });
    },
    makeNewScribble: function(request, response) {
        console.log(request.body);
        Scribble.create({username:request.body.username,message:request.body.message,date:request.body.date});
    },


    //PROFILE
    editProfile: function(request, response) {
        console.log('USERS: ',request.body[0]._id);
        User.findByIdAndUpdate(request.body[0]._id,{$set:{firstname:request.body[0].firstname,lastname:request.body[0].lastname,email:request.body[0].email,phone:request.body[0].phone,password:request.body[1]}},function(err,db_data){
            console.log('updated as: ',db_data);
            logged_in_user=db_data;
            response.send(db_data);
        });
    },

    //PERSONNEL
    getPersonnel: function(request, response) {
        User.find({},function(err,all){
            response.send(all);
        });
    },
    removePersonnel: function(request, response) {
        User.remove(request.body,function(err,removed){
            console.log('removed customer (person name) successfully');
        });
    }
}
