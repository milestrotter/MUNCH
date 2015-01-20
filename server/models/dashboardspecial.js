var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var DashboardSpecialSchema = new mongoose.Schema({
	item: String,
	description: String,
	date: {type: Date, default: d }
});
// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('item').required(true, 'User item cannot be blank');
mongoose.model('DashboardSpecial', DashboardSpecialSchema);