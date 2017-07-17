app.controller('loginController', ['$scope', '$state', '$http', '$rootScope', '$timeout', '$localStorage', 'AuthenticationService', function($scope, $state, $http, $rootScope, $timeout, $localStorage, AuthenticationService) {
    /*login function*/
    $scope.submitLoginForm = function() {
        $scope.isBusy = true;
        var data = {
            "email": $scope.email,
            "password": $scope.password,
        };

        AuthenticationService.Login(data, function(response) {
            $scope.isBusy = false;
            if (response.success) {
                $localStorage.isLogin = true;
                $localStorage.loginUser = data;
                // changing the menu 
                $scope.$emit("sendLoginInfo");
                $state.go("home");
            } else {
                alert("Invalid Credentials");
            }
        });
    }
}]);
