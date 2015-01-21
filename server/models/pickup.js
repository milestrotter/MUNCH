var mongoose = require('mongoose');

var PickupSchema = new mongoose.Schema({
	title: String,
	start: String,
	end: String,
	staff: String,
});

PickupSchema.path('title').required(true, 'Schedule name cannot be blank');
PickupSchema.path('start').required(true, 'Schedule start time cannot be blank');
PickupSchema.path('end').required(true, 'Schedule start time cannot be blank');

mongoose.model('Pickup', PickupSchema);