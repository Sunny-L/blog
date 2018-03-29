var mongoose = require('./db.js');
var tagSchema = new mongoose.Schema({
  title: String,
  is_del: {
    type: Boolean,
    default: false
  },
}, {
  collection: 'tag'
});

module.exports = mongoose.model('tag', tagSchema);