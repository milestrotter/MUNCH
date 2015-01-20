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
// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('item').required(true, 'User item cannot be blank');
mongoose.model('User', UserSchema);