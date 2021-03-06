
var app = angular.module("app", ['pascalprecht.translate', 'ui.router', 'ngStorage']);
app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'loginController',
            data: {
                requireLogin: false
            }

        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/views/register.html',
            controller: 'registerController',
            data: {
                requireLogin: false
            }

        })
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'homeController',
            data: {
                requireLogin: true
            }
        });

    $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
        'en_*': 'en',
        'de_*': 'de'
    })
    $translateProvider.translations('en', englishText);
    $translateProvider.translations('de',dutchText);
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

});

app.run(['$rootScope', '$state', '$localStorage', function($rootScope, $state, $localStorage) {
    $rootScope.$on('$stateChangeStart', function(event, $stateProvider) {
        var requireLogin = $stateProvider.data.requireLogin;
        // console.log("$localStorage",$localStorage)
        if (requireLogin && typeof $localStorage.isLogin === "undefined" && !$localStorage.isLogin) {
            // console.log("if");
            event.preventDefault();
            $state.go("login");

        } else if ($localStorage.isLogin && !requireLogin) {
            // console.log("else");
            event.preventDefault();
            $state.go("home");
        }
    });

}]);

app.controller('appController', ['$scope', '$rootScope', '$state', '$localStorage', '$translate', function($scope, $rootScope, $state, $localStorage, $translate) {

    if ($localStorage.isLogin) {
        $rootScope.luser = true;
    }

    $scope.$on("sendLoginInfo", function(evt) {
        $scope.isLogin = (typeof $localStorage.isLogin !== "undefined" && $localStorage.isLogin == true) ? true : false;
        $rootScope.luser = (typeof $localStorage.isLogin !== "undefined" && $localStorage.isLogin == true) ? true : false;
        console.log("2" + $rootScope.luser);
    });

    $scope.logoutUser = function() {
        delete $localStorage.isLogin;
        delete $localStorage.loginAdminUser;
        $scope.isLogin = false;
        $rootScope.luser = false;
        $state.go('login');
    }

    $scope.changeLanguage = function(key) {
        $translate.use(key);
    };

}]);
