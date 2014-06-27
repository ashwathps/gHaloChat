angular.module('app').value('toaster', toastr);


angular.module('app').factory('notifier', function(toaster){
    //toaster.options.fadeOut = 1000;
    toaster.options.timeOut = 1000;
   return{
       notify: function(msg){
           toaster.success(msg);
           //console.log(msg);
       },
       error: function(msg){
           toaster.error(msg);
       }
   }
});