var User = require('../models/user');
var UUID = require('node-uuid');


exports.insert = function (user, callback) {
    var mUser = new User(user);
    mUser.access_token = UUID.v4();
    mUser.avatar = "profile.png";
    mUser.save(function (err) {
        if (err) return callback(err);
        return callback(null);
    })
}

exports.getAccessToken = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username + ":  " + password);

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            res.json({
                status: 'fail',
                error: {
                    code: 1,
                    message: 'error'
                }
            })
        } else if (!user) {
            res.json({
                status: 'fail',
                error: {
                    code: 2,
                    message: 'username is wrong'
                }
            })
        } else {
            if (user.password != password) {
                res.json({
                    status: 'fail',
                    error: {
                        code: 3,
                        message: 'password is wrong'
                    }
                })
            } else {
                res.json({
                    status: 'success',
                    access_token: user.access_token
                });
            }
        }
    })
}


exports.logout = function (req, res) {
    var access_token = req.get('Authorization').substring(13);
    res.json({
        access_token: access_token
    })
}


exports.checkAccessToken = function (req, res, next) {
    var access_token = req.get('Authorization').substring(13)
    User.findOne({
        access_token: access_token
    }, function (err, emp) {
        if (err || !emp) {
            res.json({
                status: "fail",
                result: "Invalid access_token"
            });
        } else {
            return next();
        }
    });
}

exports.getUserInfo = function (req, res) {
    var access_token = req.get('Authorization').substring(13);
    var options =
        User.findOne({
            access_token: access_token
        }, function (err, user) {
            if (err || !user) {
                res.json({
                    status: "fail",
                    result: "error"
                });
            } else {
                res.json({
                    status: 'success',
                    result: {
                        username: user.username,
                        name: user.name,
                        avatar: user.avatar
                    }
                });
            }
        });

}
exports.logout = function (req, res) {
    var access_token = req.get('Authorization').substring(13);
    User.findOne({
        access_token: access_token
    }, function (err, user) {
        if (!err && user) {
            user.access_token = UUID.v4();
            user.save(function (err) {
                if (err) {
                    res.json({
                        status: "fail",
                        result: "can't logout"
                    });
                } else {
                    res.json({
                        status: "success",
                        result: "loged out"
                    });
                }

            });
        }
    });

}

exports.getAllUser = function (req, res) {
    var access_token = req.get('Authorization').substring(13);
    User.find({
        access_token: access_token
    }, function (err, user) {
        if (!err && user) {
            User.find()
                .select('_id name username avatar password access_token')
                .exec(function (err, user) {
                    if (err) {
                        res.json({
                            status: 'error'
                        });
                    } else {
                        res.json({
                            status: 'success',
                            result: user
                        });
                    }
                });
        }
    })

}

