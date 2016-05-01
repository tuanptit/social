var Post = require('../models/post');
var fs = require('fs');
exports.addPost = function (req, res) {

    console.log(req.body);
    var mPost = new Post({
        name: req.body.name,
        status: req.body.status,
        avatar: req.body.avatar,
    });
    var image = null;
    if (req.body.image != null && req.body.image != "") {
        image = Date.now().toString() + ".png";
        var buff = new Buffer(req.body.image
            .replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        fs.writeFile('public/image/' + image, buff, function (err) {
            if (err) {
                console.log(err);
            }

        });
    }
    mPost.image = image;

    mPost.timeStamp = (new Date()).getTime();

    mPost.save(function (err) {
        res.json({
            status: "success"
        })
    });

}

exports.getAllPost = function (req, res) {

    var access_token = req.get('Authorization').substring(13);
    Post.find({
        access_token: access_token
    }, function (err, post) {
        if (!err && post) {
            Post.find().select('timeStamp image name status avatar').exec(function (err, post) {
                if (err) {
                    res.json({
                        status: 'error'
                    });
                } else {
                    res.json({
                        status: 'success',
                        result: post
                    });
                }

            })
        }
    })

}
