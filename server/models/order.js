var mongoose = require('mongoose');

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
	date: Date
});

// OrderSchema.path('name').required(true, 'Schedule name cannot be blank');
// OrderSchema.path('description').required(true, 'Description cannot be blank');
// OrderSchema.path('price').required(true, 'Price cannot be blank');

mongoose.model('Order', OrderSchema);