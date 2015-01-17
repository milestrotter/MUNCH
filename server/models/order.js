var mongoose = require('mongoose');
var d=new Date();
var OrderSchema = new mongoose.Schema({
	name: String,
	item: String,
	quantity: Number,
	date: {type: Date, default: d }
});
OrderSchema.path('name').required(true, 'Order name cannot be blank');
OrderSchema.path('item').required(true, 'Order item cannot be blank');
mongoose.model('Order', OrderSchema);