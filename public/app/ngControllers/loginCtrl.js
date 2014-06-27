angular.module('app').controller('loginCtrl', function($scope, $http, Identity, notifier, $location, Auth){
    $scope.identity = Identity;
    $scope.signinx = function(n, e){
        console.log('Calling signin' + n + e);

        $http.post('/signin', {username: n, password: e}).then(function(response){
            console.log(response);
            if(response.data.success){
                //var listUsers = new listOfUserRes();
                //angular.extend(user, response.data.user);

                Identity.currentUser = response.data.user;
                notifier.notify("Logged in successfully");
            }else{
                notifier.error("Invalid details");
            }
        })
    };
    $scope.signin = function(n, p){
        console.log('Calling signin' + n + p);
        Auth.authenticateUser(n, p).then(function(success){
            if(success){
                notifier.notify("Logged in successfully");
            }else{
                notifier.error("Invalid details");
            }
        })
    };
    $scope.signout = function(){
        Identity.currentUser = undefined;
        $scope.username="";
        $scope.email = "";
        notifier.notify("Logged out successfully");
        $location.path('/');
    };
    $scope.listUsers = function(user){
        $location.path('/list_users');
    };

});