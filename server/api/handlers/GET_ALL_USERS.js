/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var async = require('async'),
    url = require('url'),
    mongoose = require('mongoose');


exports.version = "0.0.1";

exports.apiname = "GET_ALL_USERS";

exports.executeQuery = function(req, res) {

    var q_user_id = req.params['uid'];
    var queryUrlObj = url.parse(req.url, true).query;

    var user = mongoose.model('User');
    user.where({'_id' : { $ne: q_user_id } }).select({username: 1, email: 1}).exec(function(err, doc){

        if(err){
            res.status(404);
            res.write(JSON.stringify([{}]));
            res.end();
            return;
        }
        res.write(JSON.stringify(doc));
        //console.log( JSON.stringify(doc) );
        res.end();
    })
    //.limit


}