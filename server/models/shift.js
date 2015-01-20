var mongoose = require('mongoose');

var ShiftSchema = new mongoose.Schema({
	title: String,
	start: String,
	end: String
});

ShiftSchema.path('title').required(true, 'Schedule name cannot be blank');
ShiftSchema.path('start').required(true, 'Schedule start time cannot be blank');
ShiftSchema.path('end').required(true, 'Schedule start time cannot be blank');

mongoose.model('Shift', ShiftSchema);