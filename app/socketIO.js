var User = require('./models/user');
var user_array = [];
var Message = require('./models/message');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('new connection');
        var username;
        socket.on('disconnect', function (data) {
            console.log('disconnect');
            for (var i = 0; i < user_array.length; i++) {
                if (user_array[i].username == username) {
                    user_array.splice(i, 1);
                }
            }
            console.log("User disconnect:" + user_array.length);
        });


        socket.on('user-join', function (data) {
            console.log("user-join");
            User.findOne({
                username: data.username
            }, function (err, user) {
                if (err || !user) {
                } else {
                    user_array.push({
                        username: user.username,
                        id: user._id,
                        socket: socket
                    });
                    username = user.username;
                    console.log(username);
                }
            });
            console.log("User join:" + user_array.length);
        });

        socket.on('message', function (data) {

            var content = data.content;
            var toUser = data.toUser;
            var fromUser = data.fromUser;

            var user = searchUser(toUser);
            if (!user) {
            } else {
                console.log(user.socket.id);
                user.socket.emit('message', {
                    content: content
                });
            }
        });
    })
}

function searchUser(username) {
    for (var i = 0; i < user_array.length; i++) {
        if (username == user_array[i].username)
            return user_array[i];
    }
    return null;
}