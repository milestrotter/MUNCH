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
    app.post('/login',                          function(request, response) { users.login(request, response) });
    app.get('/dashboard',                       function(request, response) { users.goToDashboard(request, response) });
    //REGISTRATION

    app.post('/makeNewUser.json',           function(request, response) { users.makeNewUser(request, response) });

    //DASHBOARD
    app.get('/getDashboardMessages.json',   function(request, response) { users.getDashboardMessages(request, response) });
    app.get('/getDashboardSpecials.json',   function(request, response) { users.getDashboardSpecials(request, response) });
    app.get('/getLoggedInUserDB.json',      function(request, response) { users.getLoggedInUserDB(request, response) });
    //PROFILE
    app.post('/editProfile.json',           function(request, response) { users.editProfile(request, response) });
//-----------------------------Chris-----------------------------
    app.get('/schedules',                       function(request, response) { main.index(request, response) });
    app.get('/getSchedule.json',                function(request,response)  { main.getSchedule(request,response) });
    app.get('/getShift.json',                   function(request,response)  { main.getShift(request,response) });
    app.get('/getTips.json',                    function(request,response)  { main.getTips(request,response) });
    app.get('/getPickup.json',                  function(request,response)  { main.getPickup(request,response) });
    app.get('/getStaffList.json',               function(request,response)  { main.getStaffList(request,response) });
    
    app.post('/removeSchedule.json',            function(request,response)  { main.removeSchedule(request,response) });
    app.post('/takeShift.json',                 function(request,response)  { main.takeShift(request,response) });
    app.post('/addTip.json',                    function(request,response)  { main.addTip(request,response) });
//-----------------------------Miles-----------------------------
    app.get('/menu',                            function(request, response) { menu.index(request, response) });
    app.get('/getMenu',                         function(request, response) { menu.getMenu(request, response) });
    app.post('/newOrder.json',                  function(request, response) { menu.newOrder(request, response) });
    app.get('/mgr',                             function(request, response) { menu.mgr(request, response) });
    app.post('/newItem.json',                   function(request, response) { menu.newItem(request, response) });
    app.post('/removeItem.json',                function(request, response) { menu.removeItem(request, response) });
    app.post('/updateItem.json',                function(request, response) { menu.updateMenu(request, response) });

    app.io.route('client_ready',    function(request) {
        // sending a message to just that person
        request.io.emit('info', { msg: 'In routes.js' });

        // broadcasting to everyone
        app.io.broadcast('global_event', { msg: 'hello' });

        // broadcasting an event to everyone except the person you established the socket connection to
        request.io.broadcast('event', {msg: 'hi' });

        // listening for an event
        app.io.route('my other event', function(data) { console.log("Received 'my other event' :", data); });  
        app.io.route('disconnect',  function() { app.io.broadcast('user disconnected'); });


        // app.io.route('user_logged_in', function(data){
        //     console.log("SUCCESS!!!' :", data);
        // });
        // console.log('got to user_logged_in:',request.data);
        // app.io.broadcast('sending_logged_in_user', { msg: 'Did you get this?' });
    });
    app.io.route('user_logged_in',function(request){
        console.log('this is dumb',request.data);
    });
};
