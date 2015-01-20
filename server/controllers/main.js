var mongoose = require('mongoose');
var Schedule = mongoose.model('Schedule');
var Shift = mongoose.model('Shift');
var Tip = mongoose.model('Tip');

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
    removeSchedule: function(request, response){
        Shift.create(request.body[0]);
    	Schedule.remove(request.body[0],function(err,removed){
    		Schedule.find(function(err,db_schedules){
		    	response.send(db_schedules);
			});
    	})
    },
    takeShift: function(request, response){
        Schedule.create(request.body);
        Shift.remove(request.body, function(err, removed){
            Schedule.find(function(err,db_schedules){
                response.send(db_schedules);
            })
        });
    },
    getTips: function(request, response){
        Tip.find(function(err,db_tips){
            response.send(db_tips);
        })
    },
    addTip: function(request, response){
        Tip.create(request.body);
        console.log('Added new tip to the database');
    }
}