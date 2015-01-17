var mongoose = require('mongoose');
var d=new Date();
var CustomerSchema = new mongoose.Schema({
	name: String,
	date: {type: Date, default: d }
});
CustomerSchema.path('name').required(true, 'Customer name cannot be blank');
CustomerSchema.path('name').unique(true, 'Customer name must be unique');
mongoose.model('Customer', CustomerSchema);