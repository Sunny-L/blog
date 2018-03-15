var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.USER}:${process.env.PWD}@${process.env.HOST}:${process.env.MONGO_PORT}/${process.env.DBNAME}`);

module.exports = mongoose;