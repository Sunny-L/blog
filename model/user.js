var mongoose = require('./db.js');

var userSchema = new mongoose.Schema({
	name:String,
	email:String,
	pswd:String
},{collection:'user'});

var userModel = mongoose.model('user',userSchema);

module.exports = userModel;