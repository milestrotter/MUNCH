var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var DashboardSpecialSchema = new mongoose.Schema({
	delete_id: Number,
	item: String,
	description: String,
	date: {type: Date, default: d }
});
mongoose.model('DashboardSpecial', DashboardSpecialSchema);