'use strict';

// globals Parse

/**
 * @ngdoc service
 * @name stugrApp.Userservice
 * @description
 * # Userservice
 * Service in the stugrApp.
 */
angular.module('stugrApp')
  .service('Userservice', ['$rootScope', 'Session', 'USER_ROLES', '$state', function Userservice($rootScope, Session, USER_ROLES, $state) {
    
  	var authService = {};

  		authService.login = function(credentials) {
  			return Parse.User.logIn(credentials.username, credentials.password)
          .then(function(user) {
            console.log(user);
            Session.create(user.sessionToken, Parse.User.current());
            return user;
          });
  		};

      authService.isAuthenticated = function () {
        return !!Session.userId;
      };

      authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
          authorizedRoles.indexOf(Session.userRole) !== -1);
      },

  		authService.register = function() {

        // Create a coordinador link object with the role-specific data
        var Coordinador = Parse.Object.extend("Coordinador");
        var coordLinker = new Coordinador();

        // Save the linked object
        return coordLinker.save(null); 
  		}; // jshint ignore:line

      authService.createUser = function(credentials, id) {
        // These are the arrays with the types
        var typesLinkersClasses = ["Alumne", "Professor", "Coordinador"];
        var typesRowNames = ["alumne", "professor", "coordinador"];

        // Create the linker class with the id passed
        var LinkerClass = Parse.Object.extend(typesLinkersClasses[id]);
        var linker = new LinkerClass();

        // Create the user
        var user = new Parse.User();

        linker.save(null, {
          success: function(linker) {

            // set the user-related properties
            for (var property in credentials) {
              user.set(property, credentials[property]);
            }

            // Finally we set the LinkerClass to the corresponding linking row
            user.set(typesRowNames[id], linker);
            console.log("Executing line: user.set("+typesRowNames[id]+", "+linker+"); ");

            // Signup
            return user.signUp(null);

          },
          error: function(linker, error) {
            console.log("Could not save the link object: " + error);
          }
        });

      };

      authService.logOut = function() {
        Parse.User.logOut();
        Session.destroy();
        $state.go('anon.login');
      };
      
  	return authService;

  }])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  coord: 'coord',
  professor: 'professor',
  alumne: 'alumne'
});