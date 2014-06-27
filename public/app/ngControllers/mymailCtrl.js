angular.module('app').controller('mymailCtrl', function($scope, $http, Identity, notifier, GetMyMsgsRes, $location){
    $scope.identity = Identity;
    $scope.threads = [];
    $scope.retrievedCount = 0;
    $scope.totalCount = 0;

    fetchMessages(Identity.currentUser._id);
    /*
    GetMyMsgsRes.fetch({
        uid: Identity.currentUser._id,
        skipIndex: $scope.lastReturnedCount
    }).$promise.then(function(x){

        console.log('get mail returned with '+ x);
        if(x.header.status == 200) {
            $scope.threads = x.payload.threads;
            $scope.lastReturnedCount = x.payload.threads.length;
        }

    }, function(e){
        notifier.notify("Error: " + e.data.error);
        $location.path('/404');
    });*/

    $scope.getMoreConversations = function(){
        console.log('now calling with skipindex=' + $scope.retrievedCount);
        if($scope.totalCount != $scope.retrievedCount)
            fetchMessages(Identity.currentUser._id);
        else
            notifier.notify("No more new conversations for you");
    }

    function fetchMessages(uid){

        GetMyMsgsRes.fetch({
            uid: uid,
            skipIndex: $scope.retrievedCount
        }).$promise.then(function(x){
                console.log('get mail returned with '+ x);
                if(x.header.status == 200) {
                    $scope.threads = $scope.threads.concat(x.payload.threads);
                    $scope.retrievedCount += x.payload.threads.length;
                    $scope.totalCount = x.header.mbcount;
                }

            }, function(e){
                notifier.error(e.data.error);
                $location.path('/404');
            });
    }
});