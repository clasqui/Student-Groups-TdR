'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'Userservice', function ($scope, $rootScope, Userservice, Session) {
    	

    if(Userservice.isAuthenticated()) {
    	$scope.motd  =  "Hola, " + $rootScope.currentUser.get("first_name") + "!  El teu compte és de tipus " + $rootScope.currentUser.role();
    } else {
    	$scope.motd  =  "Not Logged In!!";
    }
    
  }]);