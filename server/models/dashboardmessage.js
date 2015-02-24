var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var DashboardMessageSchema = new mongoose.Schema({
	message: String,
	username: String,
	date: {type: Date, default: d }
});
mongoose.model('DashboardMessage', DashboardMessageSchema);