'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('AdminCtrl', ['$scope', '$rootScope', 'Userservice', function ($scope, $rootScope, Userservice) {
    
  	$scope.statusText = "Tots els sistemes funcionen correctament, no hi ha hagut incidències avui.";
    $scope.statusShow = true;




  	$scope.newUser = { 'username': '', 'email': '', 'first_name': '', 'last_name': '', 'type': ''};

  	$scope.doCreate = function() {

  		var randomPassword = Math.random().toString(36).slice(-8); // Randomly generate a password
  		var typeID = parseInt($scope.newUser.type);
  		console.log("The typeID as extracted is: "+ typeID);

  		// We delete the type property and add the password so the object is ready for the user insertion
  		delete $scope.newUser.type;
  		$scope.newUser.password = randomPassword;

  		Userservice
  			.createUser($scope.newUser, typeID)
  			.then(function(user) {

  				var types = ["Alumne", "Professor", "Coordinador"];

  				// Now display something
  				$scope.statusText = "User " + user.id + "successfully registered";
  				$scope.statusShow = true;
  				console.log("User Successfully registered, tell them to check their email.");
  				$scope.newUser.type = types[typeID];

  				Parse.Cloud.run('sendEmailWithPassword', $scope.newUser, {
            		success: function(httpResponse) {
              			console.log("Email sent. response: " +  httpResponse);
            		},
            		error: function(error) {
              			console.log("mail error: " + error);
            		}
          		});


  			}, function(error) {
  				console.log('failed registration: ', error);
  			}, function(update) {
  				console.log('update something: ', update);
  			});

  	};
      	    
  }]);
