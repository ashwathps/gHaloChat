/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

var scheduler = require('./scheduler.js')


exports.handleQuery = function(params)
{
    params['api'] =  './' + params['api'] + '.js';
    console.log(params['api']);
    scheduler.schedule(params, processedQueryResponse);
};

function processedQueryResponse(e)
{
    //console.log(e);
};