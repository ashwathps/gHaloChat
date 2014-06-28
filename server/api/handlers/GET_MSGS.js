/*
    gHaloChat, A chat application using node, angularjs & mongodb
    Author: Ashwath
    Date:
    Copyright:

 */

var async = require('async'),
    url = require('url'),
    mongoose = require('mongoose'), //nodejs mongodb modelling
    er = require('./err_codes');

exports.version = "0.0.1";

exports.apiname = "GET_MSGS";

var noDataError = function(msg) {
    var ermsg = er.no_data_error();
    ermsg.msg= msg;
    return ermsg;
};

var intServerError = function(msg) {
    var ermsg = er.int_server_error();
    ermsg.msg= msg;
    return ermsg;
};

var invalidRequestError = function(msg) {
    var ermsg = er.bad_request_error();
    ermsg.msg= msg;
    return ermsg;
};

exports.executeQuery = function(req, res) {

    var q_user_id = req.params['uid'];
    var queryUrlObj = url.parse(req.url, true).query;
    var threaded_convs = {
        totSz:  0,
        threads: []
    };

    var limit = queryUrlObj['limit'] || 4; //limit in the URL
    var skipIdx = queryUrlObj['skipIndex'] || 0;

    var usr_data = {
        sent_user: undefined,
        sent_msgs: []
    };
    var one = undefined;
    //Async series for serial execution
    async.series([
            function(callbk){
                mongoose.model('User').findById(q_user_id, function(err, usr){

                    if(usr.mailbox.length == 0){
                        callbk(noDataError("No Messages for you yet!!"));
                    }else{
                        threaded_convs.totSz = usr.mailbox.length;
                        one = paginate(usr.mailbox, skipIdx, limit);
                        //console.log('one = ' + JSON.stringify(one) + 'length ' + usr.mailbox.length);
                        callbk();
                    }
                });
            },
            function(callbk) {
                var i = 0;
                //Major scope for parallelism
                //Map reduce candidate
                (function geteachconv() {
                    if(i >= one.length) {
                        callbk();
                    }else{
                        async.series([

                            function(innercalbk){

                                mongoose.model('User').findById(one[i].sid, function(err, usr) {
                                    if (err) {
                                        innercalbk(err);
                                    }
                                    else {
                                        usr_data.sent_user = usr;
                                        innercalbk();
                                    }
                                });

                            },function(innercalbk){


                                mongoose.model('Message').find({_id : {$in: one[i].msgs}}, function(err, msgs){
                                    if(err){
                                        innercalbk(err);
                                    }
                                    //console.log("All msgs " + JSON.stringify(msgs));
                                    for(var i in msgs){
                                        usr_data.sent_msgs.push('Sent: ' + msgs[i].sentTmstmp);
                                        usr_data.sent_msgs.push(msgs[i].msg + '\n');
                                    }
                                    innercalbk();
                                });

                            }
                        ], function(err){
                            //console.log(err.msg); //ignore errors and send only valid conv
                            var conv = {
                                username: usr_data.sent_user.username,
                                email: usr_data.sent_user.email,
                                messages: usr_data.sent_msgs.join('\n')
                            }
                            threaded_convs.threads.push(conv);
                            ++i;
                            geteachconv();
                        });
                    }
                })();
            }],
        function(err) {
            if(err){
                createFinalResponse(res, err, null);
            }
            else {
                createFinalResponse(res, null, threaded_convs);
            }
        }
    );
};

function createFinalResponse(res, err, data){

    var response = {
        error: "",
        header:{
            status: 200,
            mbcount: 0
        },
        payload:{
            threads: []
        }
    };

    if(err){
        response.error = err.msg;
        response.header.status = err.status;
        response.payload = {}
    }else{
        response.error = "";
        response.header.status = 200;
        response.header.mbcount = data.totSz;
        response.payload.threads = data.threads;
    }
    res.writeHead(response.header.status, {
        'Content-Type' : 'application/json',
        'User-Agent' : 'gHaloChat'
    });
    res.write(JSON.stringify(response));
    res.end();
};

/*
    Paginate list of users when more converations have to be loaded.
*/
var paginate = function(data, skipIndex, count)
{
    var dlength = data.length;

    var startIndex = parseInt(skipIndex);
    dlength--; count--; //decreasing count because count is not as indexed 0, all other parameters are index 0

    if(startIndex > dlength){
        return data.slice(0, 0);//nothing
    }
    if( startIndex < 0 )
    {
        startIndex = 0;
    }

    var endIndex = (startIndex) + (count);

    if(startIndex > dlength){ startIndex = dlength; count = 1; endIndex = dlength; }
    else if(endIndex > dlength) { count = dlength - startIndex; endIndex = dlength; }

    return data.slice(startIndex, endIndex + 1); //does not include the endIndex, check .slice method
    //return _.range(startIndex, endIndex+1);
};
