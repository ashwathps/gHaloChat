/*
   Consume a promise
*/
angular.module('app').factory('Auth', function($http, Identity, $q, nguser){

    return{
        //Authenticate the user with a POST
        //upon result, update identity
        authenticateUser: function(u, e){

            var dfd = $q.defer();
            $http.post('/signin', {username: u, password: e}).then(function(response){
                console.log(response);
                if(response.data.success){
                    Identity.currentUser = response.data.user;
                    dfd.resolve(true);
                }else{
                    dfd.resolve(false);
                }
            })
            return dfd.promise;
        },
        //A new nguser is a User model, new will make a POST, handled in the server.
        createUser: function(newUsrData){
            var newUser = new nguser(newUsrData);
            var dfd = $q.defer();

            newUser.$save().then(function(){
                Identity.currentUser = newUser;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }

});
