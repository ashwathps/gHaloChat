angular.module('app')
    .provider('GetMyMsgsRes', function(){
        this.$get = ['$resource', function($resource){
            var fetchmessage =  $resource('/api/getmessages/:uid', {}, {
                fetch: {method: 'GET', isArray: false}
            });

            return fetchmessage;
        }]
    });