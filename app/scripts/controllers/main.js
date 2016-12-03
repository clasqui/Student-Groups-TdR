'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'Userservice', 'Session', 'NoteModel', 'TaskModel', 'USER_ROLES', 'GroupModel', function ($scope, $rootScope, Userservice, Session, NoteModel, TaskModel, USER_ROLES, GroupModel) {

  	$scope.isAuthorized = Userservice.isAuthorized;
    $scope.userRoles = USER_ROLES;

    $scope.todayTasks = [];
    $scope.recentNotes = [];
    $scope.todayClasses = [];

    $scope.weekdays = [
        {"index": 0, "string": "Dilluns"},
        {"index": 1, "string": "Dimarts"},
        {"index": 2, "string": "Dimecres"},
        {"index": 3, "string": "Dijous"},
        {"index": 4, "string": "Divendres"}
    ];

    TaskModel.getMyTasks().then(function(results) {
    	console.log(results);
    	$scope.todayTasks = results;
    }, function(error) {
    	console.log("Bruh: ", error);
    });

    NoteModel.getMyNotes().then(function(results) {
    	console.log(results);
    	$scope.recentNotes = results;
    }, function(error) {
    	console.log("Bruh: ", error);
    });

    GroupModel.getGroups().then(function(results) {
    	var d = new Date();
		var n = d.getDay();

		if(n === 7 || n === 0) {
			//weekend, nothing else
			$scope.todayClasses = [];
			return;
		}

		n = n - 1;
		console.log("CUan es n? ", n);

		for (var i = results.length - 1; i >= 0; i--) {
			var horaris = results[i].horari;
			console.log(horaris);
			if(horaris !== null) {
				for (var j = horaris.length - 1; j >= 0; j--) {
					console.log(horaris[j]);
					if(horaris[j].weekday.index === n) {
						console.log(true);
						$scope.todayClasses.push({
							'group': results[i],
							'hora': horaris[j]
						});
					}
				}
			}
		}
		console.log($scope.todayClasses);

    }, function() {

    });

    
  }]);