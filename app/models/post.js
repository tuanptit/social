var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    name: String,
    image: String,
    status: String,
    avatar: String,
    timeStamp: String,
    url: String
})

module.exports = mongoose.model('Post', postSchema);