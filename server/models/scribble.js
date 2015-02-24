var mongoose = require('mongoose');
mongoose.set('debug', true);
var d=new Date();
var ScribbleSchema = new mongoose.Schema({
	username: String,
	message: String,
	date: {type: String, default: d.getHours()+':'+d.getMinutes()}
});
mongoose.model('Scribble', ScribbleSchema);