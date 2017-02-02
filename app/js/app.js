angular.module('contactApp',[]).controller('contactform',function($scope,$http){
  $scope.contact = {};
  
  $http.get('/getContact').then(function(response){
    $scope.contact = response.data[0];
  });
  
  $scope.addContact = function(contact){
    if(contact._id){
      $http.put('/updateContact/'+contact._id,contact).then(function(response){
        alert(response.data);
      },function(response){
        alert(response.data);
      });
    }
    else{
      $http.post('/addContact',contact).then(function(response){
        alert(response.data);
      },function(response){
        alert(response.data);
      });
    }        
  };
  
});