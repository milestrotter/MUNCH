var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	phone: String,
	password: String,
	account_type: String,
	date: {type: Date, default: d }
});
mongoose.model('User', UserSchema);