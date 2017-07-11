app.controller('loginController', ['$scope','$state', '$http', '$rootScope',  '$timeout', '$localStorage', function($scope,  $state, $http, $rootScope, $timeout,$localStorage) {
    /*login function*/
    $scope.submitLoginForm = function() {
        $scope.isBusy = true;
        var data = {
            "email": $scope.email,
            "password": $scope.password,
        };
       
        $http.post('/login', data)
            .success(function(data, status, headers, config) {
                if (data != null && data.error) {
                    $scope.isBusy = false;
                    alert(data.error);
                } else if (data != null) {
                    $localStorage.isLogin = true;
                    $localStorage.loginUser = data;
                    // changing the menu 
                    $scope.$emit("sendLoginInfo");
                    $state.go("home");
                } else {
                    $scope.isBusy = false;
                    alert("Invalid Credentials");
                }
            })
            .error(function(data, status, header, config) {
                $scope.isBusy = false;
                alert(data.errors[0], 'Error');
            });

    }
}]);
