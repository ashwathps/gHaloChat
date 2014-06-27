angular.module('app').controller('allusrCtrl', function($scope, listOfUsersRes, Identity, notifier, PostMessageRes){

    var currentUser = Identity.currentUser;

    $scope.userslist = undefined;
    $scope.text2Ssend = "";

    var usrList = listOfUsersRes.query({uid: currentUser._id}).$promise.then(function(x){
        //console.log("x = ", x);
        $scope.userslist = x;
    });

    $scope.payload = {
        message: "",
        recipients: [],
        sent_time: 0
    };

    $scope.sendmessage = function(){

        if($scope.userslist === undefined || $scope.userslist.length == 0 ){
            notifier.error("No users identified");
            return;
        }
        if($scope.payload.recipients.length == 0){
            notifier.error("Please select users to send message to");
            return;
        }
        $scope.payload.sent_time = Date.now();
        PostMessageRes.post({uid: currentUser._id},  $scope.payload).$promise.then(function(res){
            notifier.notify("posted successfully");
        });
    };

    $scope.checkAll = function(){
        $scope.payload.recipients = angular.copy($scope.userslist);
    };

    $scope.uncheckAll = function(){
        $scope.payload.recipients = [];
    };
});