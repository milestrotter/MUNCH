var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var DashboardMessageSchema = new mongoose.Schema({
	message: String,
	username: String,
	date: {type: Date, default: d }
});
// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('item').required(true, 'User item cannot be blank');
mongoose.model('DashboardMessage', DashboardMessageSchema);