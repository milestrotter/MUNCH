var mongoose = require('mongoose');
var Schedule = mongoose.model('Schedule');
var Shift = mongoose.model('Shift');
var Tip = mongoose.model('Tip');
var User = mongoose.model('User');
var Pickup = mongoose.model('Pickup')
module.exports = {
    index: function(request, response) {  
        response.render('../../client/views/schedule',{ title: 'SCHEDULE' });
    },
    getSchedule: function(request,response){
		Schedule.find(function(err,db_schedules){
		    response.send(db_schedules);
		});
    },
    getShift: function(request, response){
    	Shift.find(function(err,db_shifts){
    		response.send(db_shifts)
    	})
    },
    getPickup: function(request, response){
        Pickup.find(function(err,db_pickups){
            response.send(db_pickups)
        })
    },
    removeSchedule: function(request, response){
        Shift.create(request.body[0]);
    	Schedule.remove(request.body[0],function(err,removed){
    		Schedule.find(function(err,db_schedules){
		    	response.send(db_schedules);
			});
    	})
    },
    takeShift: function(request, response){
        request.body.item.staff = request.body.username
        // Pickup.create(request.body);
        // Shift.remove(request.body, function(err, removed){
            // Shift.find(function(err,db_shifts){
            //     response.send(db_shifts);
            // })
        // });
    },
    getTips: function(request, response){
        Tip.find(function(err,db_tips){
            response.send(db_tips);
        })
    },
    addTip: function(request, response){
        Tip.create(request.body);
        console.log('Added new tip to the database', request.body);
    },
    getStaffList: function(request, response) {
        User.find(function(err,db_users){
            response.send(db_users);
        })
        
    }
}