var mongoose = require('./db.js'),
    Schema = require('mongoose').Schema

var postSchema = new mongoose.Schema({
    title: String,
    tags: [ { type: Schema.Types.ObjectId, ref: 'tag' } ],
    create_time: { type: Number, default: Date.now() },
    last_update_time: { type: Number, default: Date.now() },
    introduce: String,
    pv: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    is_del: { type: Boolean, defualt: false },
    is_publish: Boolean,
    content: String
}, { collection: 'post' });

module.exports = mongoose.model('post', postSchema);