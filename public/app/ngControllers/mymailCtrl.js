angular.module('app').controller('mymailCtrl', function($scope, $http, Identity, notifier, GetMyMsgsRes, PostMessageRes, $location){
    $scope.identity = Identity;
    $scope.threads = [];
    $scope.retrievedCount = 0;
    $scope.totalCount = 0;
    $scope.msgBackObj = {};
    $scope.payload = {
        message: "",
        recipients: [],
        sent_time: 0
    };

    var currentUser = Identity.currentUser;

    fetchMessages(Identity.currentUser._id);
    $scope.sendMessageBack = function(to_id){
        //console.log("sent message " + $scope.msgBackObj[to_id] + "to " + to_id);

        $scope.payload.sent_time = Date.now();
        $scope.payload.message = $scope.msgBackObj[to_id];
        $scope.payload.recipients.push({_id: to_id});
        //prepare payload for POST
        PostMessageRes.post({uid: currentUser._id},  $scope.payload).$promise.then(function(res){
            notifier.notify("Message sent");
            $scope.msgBackObj[to_id] = "";
        });
    }

    $scope.getMoreConversations = function(){
        //console.log('now calling with skipindex=' + $scope.retrievedCount);
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
                //console.log('get mail returned with '+ x);
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