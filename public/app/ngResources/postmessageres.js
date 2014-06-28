/*
  $resource request to POST a message to all the selected users.
*/

angular.module('app')
    .provider('PostMessageRes', function(){
        this.$get = ['$resource', function($resource){
            var postmessage =  $resource('/api/sendmessage/:uid', {}, {
                post: {method: 'POST'}
            });

            return postmessage;
        }]
    });
