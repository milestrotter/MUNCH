var mongoose = require('mongoose');
var d=new Date();
var MenuSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: String,
	date: {type: Date, default: d }
});

MenuSchema.path('name').required(true, 'Schedule name cannot be blank');
MenuSchema.path('description').required(true, 'Description cannot be blank');
MenuSchema.path('price').required(true, 'Price cannot be blank');

mongoose.model('Menu', MenuSchema);