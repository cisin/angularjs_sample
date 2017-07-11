app.controller('registerController', ['$scope', '$state', '$http', '$rootScope',  '$timeout', function($scope, $state, $http, $rootScope,  $timeout) {
    console.log("signUpController");
    $scope.submitRegisterForm = function() {
        $scope.isBusy = true;
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "password": $scope.password,
        };
        console.log(data)
        $http.post('/addUser', data)
            .success(function(data, status, headers, config) {
                if (data == null) {
                    // toastr.success('You\'re successfull signed-up', 'Success');
                    // $timeout(function() {
                    //     $state.go("login")
                    // }, 3000);
                    alert("You\'re successfull signed-up")

                } else {
                    alert("Error:",data.error)
                }
                $scope.isBusy = false;
                // toastr.success('You\'re successfull signed-up', 'Success');

            })
            .error(function(data, status, header, config) {
                $scope.isBusy = false;
                // toastr.error(data.errors.full_messages[0], 'Error');
            });
    }
}]);
