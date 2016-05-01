var express = require('express');
var admin = require('./controller/admin');
var user = require('./controller/user');
var post = require('./controller/post');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });

    app.post('/register', admin.addUser);

    app.post('/login', user.getAccessToken);

    app.get('/profile', user.checkAccessToken, user.getUserInfo);

    app.get('/logout', user.checkAccessToken, user.logout);

    app.get('/getAllUser', user.checkAccessToken, user.getAllUser);

    app.post('/change-avatar',admin.changeLogo);

    app.use(express.static(process.cwd() + '/public'));

    app.post('/post-status',post.addPost);

    app.get('/getAllPost', post.getAllPost);

}