var mongoose = require('mongoose');
var d=new Date();
var OrderSchema = new mongoose.Schema({
	name: String,
	description: String,
	index: Number, 
	notes: {
		priority: Boolean,
		custom: Boolean,
		allergy: Boolean,
		notes: String,
	},
	price: String,
	qty: Number,
	date: {type: Date, default: d }
});

// OrderSchema.path('name').required(true, 'Schedule name cannot be blank');
// OrderSchema.path('description').required(true, 'Description cannot be blank');
// OrderSchema.path('price').required(true, 'Price cannot be blank');

mongoose.model('Order', OrderSchema);