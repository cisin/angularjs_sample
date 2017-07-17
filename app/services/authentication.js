app.factory('AuthenticationService', ['$http', '$rootScope', '$timeout', 'UserService',
    function($http, $rootScope, $timeout, UserService) {
        var service = {};
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        service.Login = Login;
        service.singUp = signUp;
        return service;


        function Login(data, callback) {

            $timeout(function() {
                var response;
                UserService.loginUser(data)
                    .then(function(data) {
                        if (data != null && data.error) {
                            response = {
                                success: false,
                                message: data.error,
                            };
                        } else if (data != null) {
                            response = {
                                success: true,
                                data: data,
                            };
                        } else {
                            response = {
                                success: false,
                                message: "Invalid Credentials",
                            };
                        }
                        callback(response);
                    });
            }, 1000);

        }

        function signUp(input, callback) {

            $timeout(function() {
                var response;
                UserService.RegisterUser(input)

                .then(function(data) {
                    console.log("data", data);
                    if (data == null) {
                        response = {
                            success: true,
                            data: data
                        };
                    } else {
                        response = {
                            success: false,
                            message: data.error
                        };
                    }
                    callback(response);
                });
            }, 1000);

        }
    }
]);
