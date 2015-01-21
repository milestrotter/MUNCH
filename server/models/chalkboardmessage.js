var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var ChalkboardMessageSchema = new mongoose.Schema({
	username: String,
	message: String,
	date: {type: String, default: d.getHours()+':'+d.getMinutes()}
});
// UserSchema.path('name').required(true, 'User name cannot be blank');
// UserSchema.path('item').required(true, 'User item cannot be blank');
mongoose.model('ChalkboardMessage', ChalkboardMessageSchema);