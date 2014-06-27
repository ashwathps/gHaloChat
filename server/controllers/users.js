/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var User = require('mongoose').model('User'),
    encrypt = require('../utils/encryptmod');

exports.createUser = function(req, res, next){

    var usrData = req.body;
    usrData.username = usrData.username.toLowerCase(); //to avoid duplicate names with case different, chk auth.js
    usrData.salt = encrypt.createSalt();
    usrData.hashedPwd = encrypt.hashPwd(usrData.salt, usrData.password);

    User.create(usrData, function(err, user){
        if(err){
            if(err.toString().indexOf('E11000') > -1){
                err = new Error('Nickname already taken, try another');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        //http://passportjs.org/guide/login/
        req.logIn(user, function(err){ //added by passport
            if(err){ return next(err); }
            user.salt = "";
            user.hashedPwd = "";
            res.send(user);
        })
    });

};