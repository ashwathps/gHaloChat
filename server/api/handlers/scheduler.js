/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */
var async = require('async');

/*
 Using async.queue to queue up all the tasks.
 Each task is a command/API to be executed. Its a command pattern.

 `cmd.executeQuery(request, response)`

 */
var q = async.queue(function(params, callback){

    try{
        var cmd = require(params['api']);
        cmd.executeQuery(params['request'], params['response']);
        console.log('scheduler just ran a task');
        callback();
    }catch(e)
    {
        //callback(e);
    }

}, 100);

/*
 Schedules the task by pushing the required parameters into the async.queue
 */

exports.schedule = function(params, callback)
{
    console.log('pushing task to scheduler\n');
    q.push(params, callback);
};