//Ulysses Lin 1/15/2015

var users = require('../server/controllers/users.js');
//Chris
var main = require('../server/controllers/main.js');
//Miles
var menu = require('../server/controllers/menu.js');
//  load other controllers here

module.exports = function Routes(app) {
    app.get('/',                            function(request, response) { users.index(request, response) });
//-----------------------------Ulysses-----------------------------
    //LOGIN
    //Needs to be .post for request.body to work
    app.post('/login',                      function(request, response) { users.login(request, response) });
    app.get('/dashboard',                   function(request, response) { users.goToDashboard(request, response) });
    //REGISTRATION
    app.post('/makeNewUser.json',           function(request, response) { users.makeNewUser(request, response) });
    app.get('/getLoggedInUserDB.json',      function(request, response) { users.getLoggedInUserDB(request, response) });
    //DASHBOARD
    app.get('/getDashboardMessages.json',   function(request, response) { users.getDashboardMessages(request, response) });
    app.get('/getDashboardSpecials.json',   function(request, response) { users.getDashboardSpecials(request, response) });
    app.get('/getLoggedInUserDB.json',      function(request, response) { users.getLoggedInUserDB(request, response) });

//-----------------------------Chris-----------------------------
    app.get('/schedules',                   function(request, response) { main.index(request, response) });
    app.get('/getSchedule.json',            function(request,response)  { main.getSchedule(request,response) });
    app.get('/getShift.json',               function(request,response)  { main.getShift(request,response) });
    app.get('/getTips.json',                function(request,response)  { main.getTips(request,response) });
    
    app.post('/removeSchedule.json',        function(request,response)  { main.removeSchedule(request,response) });
    app.post('/takeShift.json',             function(request,response)  { main.takeShift(request,response) });
    app.post('/addTip.json',                function(request,response)  { main.addTip(request,response) });
//-----------------------------Miles-----------------------------
    app.get('/menu',                        function(request, response) { menu.index(request, response) });
    app.get('/getMenu',                     function(request, response) { menu.getMenu(request, response) });
    app.post('/newOrder',                   function(request, response) { menu.newOrder(request, response) });

    app.io.route('client_ready',    function(request) {
        console.log('A new user connected.');

        // sending a message to just that person
        request.io.emit('info', { msg: 'Took a lot of tryin just to get up that hill' });

        // broadcasting to everyone
        app.io.broadcast('global_event', { msg: 'hello' });

        // broadcasting an event to everyone except the person you established the socket connection to
        request.io.broadcast('event', {msg: 'hi' });

        // listening for an event
        app.io.route('my other event', function(data) { console.log("Received 'my other event' :", data); });  
        app.io.route('disconnect',  function() { app.io.broadcast('user disconnected'); });
    });
    app.io.route('user_logged_in',function(request){
        console.log('got to user_logged_in:',request.data);

    });
};
