angular.module('scotchTodo', ['ngRoute'])
    .controller('MainController', ['$scope', '$http', '$route', '$routeParams', '$location', function ($scope, $http, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.log = "Login";
     }])
    .controller('ShowMainController', ['$scope', '$http', function ($scope, $http){
        $scope.formData = {};
        $scope.achives = [];

        // when landing on the page, get all todos and show them
        $http.get('/main')
            .success(function(data) {
                $scope.achives = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }])
    .controller('CreateAchiveController', ['$scope', '$http', function ($scope, $http){
        $scope.formData = {};
        $scope.achives = [];

        // when landing on the page, get all todos and show them
        $http.get('/createrPage')
            .success(function(data) {
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            $http.post('/createAchive', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.achives = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            $http.delete('/deleteAchive/' + id)
                .success(function(data) {
                    $scope.achives = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }])
    .controller('LoginController', ['$scope', '$http', function ($scope, $http){
        $scope.formData = {};
        $scope.achives = [];

        // when landing on the page, get all todos and show them
        $http.get('/login')
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.login = function() {
            $http.post('/login', $scope.formData)
                .success(function(data) {
                    console.log(data);
                    // REDIRECT
                    if(data) window.location.href = "#/"
                        else {
                            $scope.isShowingError = true;
                            $scope.formData = {};
                        }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }])
    .controller('SignupController', ['$scope', '$http', function ($scope, $http){
        $scope.formData = {};
        $scope.achives = [];
        $scope.isShowingError = false;

        // when landing on the page, get all todos and show them
        $http.get('/signup')
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.signup = function() {
            $http.post('/signup', $scope.formData)
                .success(function(data) {
                    console.log(data);
                    // REDIRECT
                    if(data) window.location.href = "#/"
                        else {
                            $scope.isShowingError = true;
                            $scope.formData = {};
                        }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }])
    .config(function ($routeProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location){ 
            // Initialize a new promise 
            var deferred = $q.defer(); 
            // Make an AJAX call to check if the user is logged in 
            $http.get('/loggedin').success(function(user){ 
                // Authenticated 
                if (user !== '0') {
                    $scope.log = "Login";
                    deferred.resolve();
                } 
                // Not Authenticated 
                else { 
                    $scope.log = "Logout";
                    window.location.href = "#/login";
                    deferred.reject(); 
                } 
            }); 
            return deferred.promise; 
        };
      $routeProvider
       .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ShowMainController',
        resolve: {
            loggedin: checkLoggedin
        }
      })
      .when('/new', {
        templateUrl: 'views/new.html',
        controller: 'CreateAchiveController',
        resolve: {
            loggedin: checkLoggedin
        }
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      });
    });

// public/core.js
// var scotchTodo = angular.module('scotchTodo', []);

// function mainController($scope, $http) {
//     $scope.formData = {};

//     // when landing on the page, get all todos and show them
//     $http.get('/api/todos')
//         .success(function(data) {
//             console.log("DATA ", data);
//             $scope.todos = data;
//             console.log(data);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });

//     // when submitting the add form, send the text to the node API
//     $scope.createTodo = function() {
//         $http.post('/api/todos', $scope.formData)
//             .success(function(data) {
//                 $scope.formData = {}; // clear the form so our user is ready to enter another
//                 $scope.todos = data;
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };

//     // delete a todo after checking it
//     $scope.deleteTodo = function(id) {
//         $http.delete('/api/todos/' + id)
//             .success(function(data) {
//                 $scope.todos = data;
//                 console.log(data);
//             })
//             .error(function(data) {
//                 console.log('Error: ' + data);
//             });
//     };

// }