var mongoose = require('./db.js');
var tagSchema = new mongoose.Schema({
	title:String,
	value:String,
    is_del:Boolean,
},{collection:'tag'});

module.exports = mongoose.model('tag',tagSchema);
