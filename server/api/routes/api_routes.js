/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var usr_api = require('../handlers/main.js');

module.exports = function(express){

    //configure_api_routes
    express.namespace("/api", function(){
        express.get('/all_users/:uid??', function(req, res){
            usr_api.handleQuery( {api: 'GET_ALL_USERS', request: req, response: res});
        });

        express.get("/getmessages/:uid??", function(req, res){
            usr_api.handleQuery({api: 'GET_MSGS', request: req, response: res});
        });

        express.post("/sendmessage/:uid??", function(req, res){
            usr_api.handleQuery({api: 'POST_MSGS', request: req, response: res});
        });
    });

}