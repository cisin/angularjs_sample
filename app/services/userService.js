app.factory('UserService', ['$http',
    function($http) {
        var service = {};

        service.loginUser = loginUser;
        service.RegisterUser = RegisterUser;
        return service;

        function loginUser(data) {
            return $http.post('/login', data).then(handleSuccess, handleError('Error getting user by email'));
        }

        function RegisterUser(user) {
            return $http.post('/addUser', user).then(handleSuccess, handleError('Error creating user'));
        }


        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return {
                    success: false,
                    message: error
                };
            };
        }
    }
]);
