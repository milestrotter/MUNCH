var mongoose = require('mongoose');

var TipSchema = new mongoose.Schema({
	date: String,
	amount: String
});

TipSchema.path('amount').required(true, 'Tip amount cannot be blank');

mongoose.model('Tip', TipSchema);