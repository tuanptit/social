var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    avatar: String,
    name: String,
    username: String,
    password: String,
    access_token: String
});

mongoose.connect('mongodb://localhost:27017/node-social');
module.exports = mongoose.model('User', personSchema);