//Ulysses Lin 1/15/15
//NOTE: This file is called 'orders.js' but it deals with the 'orders' AND 'customers' collections/dbs
var mongoose = require('mongoose')
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');

module.exports = {
    index: function(request, response) {
        Order.remove({},function(err,removed){
        });
        Customer.remove({},function(err,removed){
        });
        var d=new Date();
        d=d.toDateString();
        //Initialize 'orders' collection/db with some entries
        Order.create({name:'Ben',item:'Ice cream cones',quantity:3,date:d},{name:'Jerry',item:'Ice cream cones',quantity:3,date:d});
        //Initialize 'customers' collection/db with some entries
        Customer.create({name:'Ben',date:d},{name:'Jerry',date:d});
        response.render('../../client/views/login',{ title: 'MUNCH' });
    },

//----------CUSTOMERS----------
    getCustomers: function(request,response){
        Customer.find(function(err,db_customers){
            response.send(db_customers);
        });
    },
    makeNewCustomer: function(request,response){
        a = new Customer(request.body);
        a.save(function(err) {
            if (err) {
                response.send(JSON.stringify(err));
            } else {
                console.log('success: created new Customer (person name)');
            }
        });
    },
    removeCustomer: function(request,response){
        Customer.remove(request.body,function(err,removed){
            console.log('removed customer (person name) successfully');
        });
    },

//----------ORDERS----------
    getOrders: function(request,response){
        Order.find(function(err,db_orders){
            response.send(db_orders);
        });
    },
    makeNewOrder: function(request,response){
        a = new Order(request.body);
        a.save(function(err) {
            if (err) {
                response.send(JSON.stringify(err));
            } else {
                console.log('success: created new Order');
            }
        });
    },
    removeOrder: function(request,response){
        Order.remove(request.body,function(err,removed){
            console.log('removed order successfully');
        });
    }
}