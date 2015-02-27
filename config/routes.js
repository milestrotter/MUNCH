//Ulysses Lin 1/15/2015

var users = require('../server/controllers/users.js');
//Chris
var main = require('../server/controllers/main.js');
//Miles
var menu = require('../server/controllers/menu.js');

module.exports = function Routes(app) {
    app.get('/',                                function(req, res) { users.index(req, res) });
//-----------------------------Ulysses-----------------------------
//LOGIN
    app.post('/login',                          function(request, response) { users.login(request, response) });
    app.get('/dashboard',                       function(request, response) { users.goToDashboard(request, response) });
    app.post('/login_submit',                   function(request, response) { users.login(request, response) });
//REGISTRATION
    app.post('/makeNewUser.json',               function(request, response) { users.makeNewUser(request, response) });
//DASHBOARD
//->MESSAGES
    app.get('/getDashboardMessages.json',       function(request, response) { users.getDashboardMessages(request, response) });
    app.post('/makeNewDashboardMessage.json',   function(request, response) { users.makeNewDashboardMessage(request, response) });
    app.post('/deleteDashboardMessage.json',    function(request, response) { users.deleteDashboardMessage(request, response) });
//->SPECIALS    
    app.get('/getDashboardSpecials.json',       function(request, response) { users.getDashboardSpecials(request, response) });
    app.post('/makeNewDashboardSpecial.json',   function(request, response) { users.makeNewDashboardSpecial(request, response) });
    app.post('/deleteDashboardSpecial.json',    function(request, response) { users.deleteDashboardSpecial(request, response) });
//->SCRIBBLES    
    app.get('/getScribbles.json',               function(request, response) { users.getScribbles(request, response) });
    app.post('/makeNewScribble.json',           function(request, response) { users.makeNewScribble(request, response) }); 
    
    app.get('/getLoggedInUserDB.json',          function(request, response) { users.getLoggedInUserDB(request, response) });
//PROFILE
    app.post('/editProfile.json',               function(request, response) { users.editProfile(request, response) });
//PERSONNEL
    app.get('/getPersonnel.json',               function(request, response) { users.getPersonnel(request, response) });
    app.post('/removePersonnel.json',           function(request, response) { users.removePersonnel(request, response) });
    app.post('/editPay.json',                   function(request, response) { users.editPay(request, response) });
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
    app.post('/newItem.json',                   function(request, response) { menu.newItem(request, response) });
    app.post('/removeItem.json',                function(request, response) { menu.removeItem(request, response) });
    app.post('/updateItem.json',                function(request, response) { menu.updateMenu(request, response) });
    app.get('/logout',                          function(req, res) { users.index(req, res) });

    app.io.route('dashboard_message_submitted',function(request){
        request.io.broadcast('dashboard_message_everyone',request.data);
    });
    app.io.route('dashboard_delete_message',function(request){
        request.io.broadcast('dashboard_delete_message_everyone',request.data);
    });
    app.io.route('dashboard_new_special_submitted',function(request){
        request.io.broadcast('dashboard_special_everyone',request.data);
    });
    app.io.route('dashboard_delete_special',function(request){
        request.io.broadcast('dashboard_delete_special_everyone',request.data);
    });
    app.io.route('scribble_submitted',function(request){
        app.io.broadcast('scribble_everyone',request.data);
    });
};