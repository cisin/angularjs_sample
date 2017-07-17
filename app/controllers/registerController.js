app.controller('registerController', ['$scope', '$state', '$http', '$rootScope', '$timeout', 'AuthenticationService', function($scope, $state, $http, $rootScope, $timeout, AuthenticationService) {
    console.log("signUpController");
    $scope.submitRegisterForm = function() {
        $scope.isBusy = true;
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "password": $scope.password,
        };
        AuthenticationService.singUp(data, function(response) {
            console.log("response", response)
            $scope.isBusy = false;
            if (response.success) {
                alert("You\'re successfull signed-up");
                $state.go("login");
            } else {
                alert("Error: " + response.message);
            }
        });
    }
}]);
