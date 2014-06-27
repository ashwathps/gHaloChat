/*
 gHaloChat, A chat application using node, angularjs & mongodb
 Author: Ashwath
 Date:
 Copyright:

 */

exports.version = '0.0.1';

/*
 404 - No data found error
 */
exports.no_data_error = function(){
    return {
        'status': 404};
};

/*
 500 - Internal server error, something went horribly wrong in the simulator.
 */
exports.int_server_error = function(){
    return {
        'status' : 500};
};

/*
 400 - Missing Mandatory paramter error.
 */
exports.missing_parameter_error = function(){
    return {
        'status' : 400};
};

/*
 400 - Invalid request  error.
 */
exports.bad_request_error = function(){
    return {
        'status' : 400};
};


