var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    fromUser: String,
    toUser: String,
    content: String
});

module.exports = mongoose.model('Message', messageSchema);