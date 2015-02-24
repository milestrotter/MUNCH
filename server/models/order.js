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

mongoose.model('Order', OrderSchema);