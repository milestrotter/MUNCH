var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
	title: String,
	start: String,
	end: String,
	start: String,
	date: String
});

ScheduleSchema.path('title').required(true, 'Schedule name cannot be blank');
ScheduleSchema.path('start').required(true, 'Schedule start time cannot be blank');
ScheduleSchema.path('end').required(true, 'Schedule start time cannot be blank');

mongoose.model('Schedule', ScheduleSchema);