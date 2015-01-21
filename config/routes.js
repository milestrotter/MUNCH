//Ulysses Lin 1/15/2015

var users = require('../server/controllers/users.js');
//Chris
var main = require('../server/controllers/main.js');
//Miles
var menu = require('../server/controllers/menu.js');
//  load other controllers here

module.exports = function Routes(app) {
    app.get('/',                                function(req, res) { users.index(req, res) });
//-----------------------------Ulysses-----------------------------
    //LOGIN
    //Needs to be .post for req.body to work
    app.post('/login',                          function(req, res) { users.login(req, res) });
    app.get('/dashboard',                       function(req, res) { users.goToDashboard(req, res) });
    //REGISTRATION
    app.post('/makeNewUser.json',               function(req, res) { users.makeNewUser(req, res) });

    //DASHBOARD
    app.get('/getDashboardMessages.json',       function(req, res) { users.getDashboardMessages(req, res) });
    app.get('/getDashboardSpecials.json',       function(req, res) { users.getDashboardSpecials(req, res) });

//-----------------------------Chris-----------------------------
    app.get('/schedules',                       function(req, res) { main.index(req, res) });
    app.get('/getSchedule.json',                function(req,res)  { main.getSchedule(req,res) });
    app.get('/getShift.json',                   function(req,res)  { main.getShift(req,res) });
    app.get('/getTips.json',                    function(req,res)  { main.getTips(req,res) });
    
    app.post('/removeSchedule.json',            function(req,res)  { main.removeSchedule(req,res) });
    app.post('/takeShift.json',                 function(req,res)  { main.takeShift(req,res) });
    app.post('/addTip.json',                    function(req,res)  { main.addTip(req,res) });
//-----------------------------Miles-----------------------------
    app.get('/menu',                            function(req, res) { menu.index(req, res) });
    app.get('/getMenu',                         function(req, res) { menu.getMenu(req, res) });
    app.post('/newOrder.json',                  function(req, res) { menu.newOrder(req, res) });
    app.get('/mgr',                             function(req, res) { menu.mgr(req, res) });
    app.post('/newItem.json',                   function(req, res) { menu.newItem(req, res) });
    app.post('/removeItem.json',                function(req, res) { menu.removeItem(req, res) });
    app.post('/updateItem.json',                function(req, res) { menu.updateMenu(req, res) });

    app.io.route('client_ready',    function(request) {
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
