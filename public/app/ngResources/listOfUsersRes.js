/*
  $resurce request to fetch all the registered users in the server.
  limit the response to 10 per request
*/

angular.module('app').factory('listOfUsersRes', ['$resource', function($resource){
  //TODO: handle limit
  var listOfUsersResource =  $resource('/api/all_users/:uid', {uid: '@uid', limit: 10}, {
      query: {method: 'GET', isArray:true}
  });

  return listOfUsersResource;
}]);
