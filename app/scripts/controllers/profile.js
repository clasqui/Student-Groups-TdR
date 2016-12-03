'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('ProfileCtrl', ['$rootScope', '$scope', 'GroupModel', 'Userservice', 'USER_ROLES', '$stateParams', '$state', 'NoteModel', 'TaskModel', 'StugrUser', function ($rootScope, $scope, GroupModel, Userservice, USER_ROLES, $stateParams, $state, NoteModel, TaskModel, StugrUser) {
    
  	if($stateParams.id) {

  		$scope.fetchedUser = {};

  		//The view is for another profile, show the details
  		StugrUser.getUser($stateParams.id).then(function(user) {
  			$scope.fetchedUser = user;
  		}, function(error) {
  			console.log(error);
  		});

  	} else {
  		// this is my profile, edit the details
  		$scope.currentUser = $rootScope.currentUser;


  		$scope.passwordChange = {
  			'newPass': '',
  			're': ''
  		};

  		$scope.specific = {
  			'phone': '',
  			'email': ''
  		};

  		var Alumne = Parse.Object.extend("Alumne");
  		var query = new Parse.Query(Alumne);
  		query.equalTo("objectId", $scope.currentUser.alumne);
  		query.first().then(function(alumne) {
  			$scope.specific.phone = alumne.get("familyPhone");
  			$scope.specific.email = alumne.get("familyEmail");
  		}, function(error) {
  			console.log("There's been an error: ", error);
  		});

  		$scope.saveChanges = function() {
  			$scope.currentUser.save().then(function() {
  				console.log("Changed");
  			}, function() {
  				console.log("There's been an error");
  			});
  		};

  		$scope.changePassword = function() {
  			if($scope.passwordChange.newPass === $scope.passwordChange.re) {
  				$scope.currentUser.set("password", $scope.passwordChange.newPass);
  				$scope.currentUser.save().then(function() {
  					console.log("Changed");
  				}, function(error) {
  					console.log("Theres nneen an error, ", error);
  				});
  			}
  		};

  	}

  }]);
