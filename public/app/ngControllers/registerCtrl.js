angular.module('app').controller('registerCtrl', function($scope, notifier, $location, Auth){

    $scope.register = function(){
        var newuserdata = {
            username: $scope.nickname,
            email: $scope.email,
            password: $scope.password
        };

        Auth.createUser(newuserdata).then(function(){
            notifier.notify('User account created');
            $location.path('/');
        }, function(reason){
            notifier.error(reason);
        })
    }
});