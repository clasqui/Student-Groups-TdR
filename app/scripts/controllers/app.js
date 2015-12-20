'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('AppCtrl', ['$rootScope', '$scope', '$location', 'Userservice', 'StugrUser', 'AUTH_EVENTS', 'USER_ROLES', '$state', 'Session', function ($rootScope, $scope, $location, Userservice, StugrUser, AUTH_EVENTS, USER_ROLES, $state, Session) {

  $scope.userCredentials       =   { 'username': '', 'password': '', 'email': '', 'first_name': '', 'last_name': ''};
  $scope.registerUserMode      =   false;
  $rootScope.codename          =   "Student Groups";

  $scope.showRegistrationForm  =   function(){ $scope.registerUserMode = true; };

  $scope.currentUser = $rootScope.currentUser;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = Userservice.isAuthorized;
  $scope.isLoggedIn = Userservice.isAuthenticated;
  console.log(Userservice.isAuthenticated());
  $scope.setCurrentUser = function (user) {
    $rootScope.currentUser = user;
    $scope.currentUser = user;
  };

  	$scope.doLogin = function() {
  		console.log("Login Credentials: ", $scope.userCredentials);
  		Userservice
  			.login($scope.userCredentials)
  			.then(function(response) {
  				console.log('Successful login', response);
  				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(Parse.User.current());
          $state.go('home');

  			}, function(reason) {
  				console.log('Failed Login: ', reason);
  				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
  			});
  	};

  	$scope.doRegister = function() {
  		Userservice
  			.register()
  			.then(function(coord) {

            // Create the user
            var user = new Parse.User();

            // set the user-related properties
            for (var property in $scope.userCredentials) {
              user.set(property, $scope.userCredentials[property] );
            }

            // Set the coordinador linker in the 'coordinador' row of type Pointer
            user.set("coordinador", coord);

            // Signup
            /*
             * 
             * 
             * 
             */
            user.signUp(null, {

              success: function(user){
              console.log("User " + user.id + " successfully registered!");
              $scope.userCredentials.type = "Coordinador";
              Parse.Cloud.run('sendEmailWithPassword', $scope.userCredentials, {
                success: function(httpResponse) {
                  console.log("Email sent. response: " +  httpResponse);
                },
                error: function(error) {
                  console.log("mail error: " + error);
                }
              });
              
              }, 

              error: function(user, error) {
                console.log('failed registration: ', error);
              }
            });
          },
          function(error) {
            console.log("Could not save the link object, error: " + error.code);
          });
  	};

    $scope.doLogOut = function() {
      Userservice.logOut();
      document.location.reload();
      $state.go('anon.login');

    };

  }]);
