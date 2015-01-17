//Ulysses Lin 1/15/2015

var orders = require('../server/controllers/orders.js');
//  load other controllers here

module.exports = function Routes(app) {
    app.get('/',                     function(request, response) { orders.index(request, response) });
    app.get('/orders',               function(request, response) { orders.index(request, response) });
    app.get('/orders/index',         function(request, response) { orders.index(request, response) });
//----------CUSTOMERS----------
    app.get('/getCustomers.json',    function(request,response){orders.getCustomers(request,response) });
    app.post('/makeNewCustomer.json',function(request,response){orders.makeNewCustomer(request,response) });
    app.post('/removeCustomer.json', function(request,response){orders.removeCustomer(request,response) });
//----------ORDERS----------
    app.get('/getOrders.json',       function(request,response){orders.getOrders(request,response) });
    app.post('/makeNewOrder.json',   function(request,response){orders.makeNewOrder(request,response) });
    app.post('/removeOrder.json',    function(request,response){orders.removeOrder(request,response) });

    app.io.route('client_ready',     function(request) {
        console.log('A new user connected.');

        // sending a message to just that person
        request.io.emit('info', { msg: 'The world is round, there is no up or down.' });

        // broadcasting to everyone
        app.io.broadcast('global_event', { msg: 'hello' });

        // broadcasting an event to everyone except the person you established the socket connection to
        request.io.broadcast('event', {msg: 'hi' });

        // listening for an event
        app.io.route('my other event', function(data) { console.log("Received 'my other event' :", data); });  
        app.io.route('disconnect',  function() { app.io.broadcast('user disconnected'); });
    });
};
