/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var passport = require('passport');

exports.authenticate = function(req, res, next){

    req.body.username = req.body.username.toLocaleLowerCase(); //user.js
    var auth = passport.authenticate('local', function(err, user) {
        if (err) {
            return next(err);
        }
        //console.log("userobject = ", user);
        if (!user) {
            res.send({success: false})
        }
        //console.log("!user = ", !user);
        //passport adds a logIn to the req object. XHR login
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            user.hashedPwd = "";
            user.salt = "";
            res.send({success: true, user: user});
        })
    });
    auth(req, res, next);
}