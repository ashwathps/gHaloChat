angular.module('app').factory('listOfUsersRes', ['$resource', function($resource){
  var listOfUsersResource =  $resource('/api/all_users/:uid', {uid: '@uid', limit: 10}, {
      query: {method: 'GET', isArray:true}
  });

  return listOfUsersResource;
}]);