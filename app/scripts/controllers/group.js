'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:GroupctrlCtrl
 * @description
 * # GroupctrlCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupModel', 'Userservice', 'USER_ROLES', '$stateParams', function ($rootScope, $scope, GroupModel, Userservice, USER_ROLES, $stateParams) {
    $scope.isAuthorized = Userservice.isAuthorized;
    $scope.userRoles = USER_ROLES;

    GroupModel.getGroups().then(function(results) {
       	$scope.myGroups = results;
    }, 
    function(aError) {
        console.log(aError);
    });

    $scope.searchData = '';

    $scope.groupData = {'nom': '', 'alumnes': []};

    $scope.createGroup = function() {
    	GroupModel.createGroup($scope.groupData.nom);
    	$scope.myGroups.push($scope.groupData);
    };

    if($stateParams.id){
    	GroupModel.getGroupWithId($stateParams.id).then(function(result) {
    		$scope.groupData = result;
    	}, function(error) {
    		console.log(error);
    	});
    }

  }]);
