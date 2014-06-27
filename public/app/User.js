angular.module('app').factory('nguser', function($resource){
    var UserRes = $resource('/users/:uid', {_id: "@id"});

    return UserRes;

    //a new nguser() will behave as a POST
})