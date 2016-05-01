var userController = require('./user');
var express = require('express');

var User = require('../models/user');
var fs = require('fs');
exports.addUser = function (req, res) {
    var mUser = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({
        username: mUser.username
    }, function (err, user) {
        if (user) {
            res.json({
                status: 'error',
                errors: [{
                    code: 0,
                    message: 'username exits'
                }]
            })
        } else {
            userController.insert(mUser, function (err) {
                if (err) {
                    res.json({
                        status: 'error',
                        errors: [{
                            code: 1,
                            message: 'system error'
                        }]
                    });
                } else {
                    res.json({
                        status: 'success'
                    });
                }
            })
        }
    });

}

exports.changeLogo = function (req, res) {
    var access_token = req.get('Authorization').substring(13);
    var image =Date.now().toString()+".png";
    var buff = new Buffer(req.body.avatar
        .replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
    fs.writeFile('public/image/'+image, buff, function (err) {
        if(err) {
            console.log(err);
        }
        console.log('done');
        User.findOneAndUpdate(
                    {"access_token": access_token},
                    {"avatar": image}, function(err) {
                        if(err) {
                            return res.end(err + "Error update");
                        }
                    }
                )
        res.end("File is uploaded");
    });


    //var multer = require('multer');
    //var imageServerName;
    //var storage = multer.diskStorage({
    //    destination: function (req, file, callback) {
    //        callback(null, 'public/image');
    //    },
    //    filename: function (req, file, callback) {
    //        var ext = file.originalname.split('.').pop();
    //        imageServerName = Date.now().toString() + "." + ext;
    //        callback(null, imageServerName);
    //        console.log(file.originalname);
    //    }
    //});
    //
    //var upload = multer({storage: storage}).single('avatar');
    //upload(req, res, function (err) {
    //    if (err) {
    //        return res.end(err + "Error uploading file.");
    //    }
    //
    //    User.findOneAndUpdate(
    //        {"access_token": access_token},
    //        {"avatar": imageServerName}, function(err) {
    //            if(err) {
    //                return res.end(err + "Error update");
    //            }
    //        }
    //    )
    //    res.end("File is uploaded");
    //});
}




