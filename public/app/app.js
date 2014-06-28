/*
    Angularjs application 'app'
*/

angular.module('app', ['ngResource', 'ngRoute', 'checklistModel']);

angular.module('app').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: "/partials/main", controller: 'mainCtrl'})
        .when('/list_users', {templateUrl: '/partials/listofusers', controller: 'allusrCtrl' })
        .when('/mail', {templateUrl: '/partials/mymail', controller: 'mymailCtrl' })
        .when('/register', {templateUrl: '/partials/register', controller: 'registerCtrl' })
});

//main controller for main.jade
angular.module('app').controller('mainCtrl', function($scope){
    $scope.someVar = "Hello Angular"
});
