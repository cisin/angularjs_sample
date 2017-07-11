app.controller('homeController', ['$scope','$rootScope','$state', '$http', '$rootScope',  '$timeout', '$localStorage', function($scope,$rootScope,  $state, $http, $timeout,$localStorage) {
    /*login function*/
    $scope.songSrc = "";

    $scope.playAudio = function(song){
        $scope.songSrc = "";
        var player = document.getElementById('myAudio');
        $scope.songSrc = "public/songs/"+song+".mp3";
        setTimeout(function(){
            player.play();
        },1000);
        
    }
     $scope.pauseAudio = function(song){
         var player = document.getElementById('myAudio');
           player.pause();
    }
    
  
}]);
