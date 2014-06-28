/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */


var async = require('async'),
    mongoose = require('mongoose');

exports.version = "0.0.1";

exports.apiname = "POST_MSGS";

exports.executeQuery = function(req, res) {

    var contentType = req.get('content-type');

    if(contentType.indexOf('application/json') != -1) {
        var sender = req.params['uid'];
        var payload = req.body;

        var newmsg_instance = create_message_doc(payload, sender);

        newmsg_instance.save(function(err, newmsg){
           if(err){
               //send 500 internal server error
           }
            console.log('new message id = ', newmsg.id);

            for(var i in payload.recipients) {

                mongoose.model('User').findById(payload.recipients[i]._id, function(err, usr){
                    if(err) {
                        console.log(err.msg);
                        handleresponse(req, res, err);
                        return;
                    }
                    //1st time
                    //if(usr.mailbox.length == 0){
                    //
                    //    usr.mailbox.unshift(makeNewMessageEntry(sender, newmsg.id));
                    //}
                    //check if there is already a message from the same sender
                    //else {
                        //TODO: find a mongodb equivalent instead of this loop
                        var found = false;
                        for (var m in usr.mailbox) {
                            if (usr.mailbox[m].sid == sender) {
                                //console.log("found msgs from this sender already, so pushing");
                                usr.mailbox[m].msgs.unshift(newmsg.id);
                                //console.log(usr.mailbox[m].msgs);
                                found = true;
                                break;
                            }
                        }
                        if(!found){

                            usr.mailbox.unshift(makeNewMessageEntry(sender, newmsg.id));
                        }
                    //}
                    usr.save(function(err){
                        console.log('save done');
                        if(err)
                        console.log(err.msg);
                    });
                });
            }//for
        });
    }
    else{
        //req.text
    }
    res.write(JSON.stringify({api: "POST_MSGS", success: true}));
    res.end();

};

function makeNewMessageEntry(sender, msgid){

    var mentry = {
        sid: sender,
        msgs: [msgid]
    }
    return mentry;
};

function handleresponse(req, res, err){
    var ret = {};
    if(err){
        res.end();
    }

};

// Single message create
function create_message_doc(payload, sender){

    var msgQ = mongoose.model('Message');

    var newmsg_instance = new msgQ();
    newmsg_instance.msg = payload.message;
    newmsg_instance.sentTmstmp = payload.sent_time;
    newmsg_instance.rcvTmstmp = Date.now();
    newmsg_instance.sender = new mongoose.Types.ObjectId(sender);

    return newmsg_instance;
}
