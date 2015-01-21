//Ulysses Lin 1/15/15
//NOTE: This file is called 'orders.js' but it deals with the 'orders' AND 'customers' collections/dbs
var mongoose = require('mongoose')
var User = mongoose.model('User');
var DashboardMessage = mongoose.model('DashboardMessage');
var DashboardSpecial = mongoose.model('DashboardSpecial');
var logged_in_user = {};

module.exports = {
    index: function(request, response) {
        User.remove({},function(err,removed){
        });
        DashboardMessage.remove({},function(err,removed){
        });
        DashboardSpecial.remove({},function(err,removed){
        });
        var d=new Date();
        d=d.toDateString();
        //Initialize 'users' collection
        User.create({firstname:'Anders',lastname:'Holmvik',username:'DERS',email:'DJango@yahoo.com',phone:'555-555-5555',password:'1',account_type:'mgmt'});
        DashboardMessage.create(
            {message:'Clean up that stuff on the floor, what is that even',username:'BIGBOSS',date:d},
            {message:'Need more beer, now!',username:'BIGBOSS',date:d},
            {message:'You all gonna be fired',username:'BIGBOSS',date:d});
        DashboardSpecial.create(
            {item:'Goop',description:'Pretty awful stuff actually'},
            {item:'Cookies',description:'2 cookies baked to mediocrity'});
        response.render('../../client/views/login',{ title: 'MUNCH' });
    },
    goToDashboard: function(request, response) {
        response.render('../../client/views/dashboard',{ title: 'DASHBOARD' });
    },
    login: function(request, response){
        User.findOne({username:request.body.username.toUpperCase()},function(err,db_found_user){
            if(db_found_user.length==0){
                console.log('User not found.');
                response.send('User not found.');
            }else{
                if(request.body.password!==db_found_user.password){
                    console.log('Incorrect password.');
                    console.log('entered: ',request.body.password);
                    console.log('actual: ',db_found_user.password);
                    response.send('Incorrect password.');
                }else{
                    logged_in_user=db_found_user;
                    console.log('FOUND: ',logged_in_user);
                    response.send(db_found_user);
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
        // console.log('got to: getDashboardMessages');
        DashboardMessage.find({},function(err,db_dashboard_messages){
            // console.log(db_dashboard_messages);
            response.send(db_dashboard_messages);
        });
    },
    getDashboardSpecials: function(request, response) {
        // console.log('got to: getDashboardSpecials');
        DashboardSpecial.find({},function(err,db_dashboard_specials){
            // console.log(db_dashboard_specials);
            response.send(db_dashboard_specials);
        });
    }
}
//----------CUSTOMERS----------
//     getCustomers: function(request,response){
//         Customer.find(function(err,db_customers){
//             response.send(db_customers);
//         });
//     },
//     makeNewCustomer: function(request,response){
//         a = new Customer(request.body);
//         a.save(function(err) {
//             if (err) {
//                 response.send(JSON.stringify(err));
//             } else {
//                 console.log('success: created new Customer (person name)');
//             }
//         });
//     },
//     removeCustomer: function(request,response){
//         Customer.remove(request.body,function(err,removed){
//             console.log('removed customer (person name) successfully');
//         });
//     },

// //----------ORDERS----------
//     getOrders: function(request,response){
//         Order.find(function(err,db_orders){
//             response.send(db_orders);
//         });
//     },
//     makeNewOrder: function(request,response){
//         a = new Order(request.body);
//         a.save(function(err) {
//             if (err) {
//                 response.send(JSON.stringify(err));
//             } else {
//                 console.log('success: created new Order');
//             }
//         });
//     },
//     removeOrder: function(request,response){
//         Order.remove(request.body,function(err,removed){
//             console.log('removed order successfully');
//         });
//     }
