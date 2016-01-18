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
        if(results.length == 0) {
            $scope.noGroups = true;
            $scope.myGroups = [];
        } else {
            $scope.noGroups = false;
       	    $scope.myGroups = results;
        }
    }, 
    function(aError) {
        //console.log(aError);
    });

    $scope.newGrupAccordionIsOpen = false;

    $scope.searchData = '';

    $scope.groupData = {'nom': '', 'alumnes': []};

    $scope.weekdays = [
        {"index": 0, "string": "Dilluns"},
        {"index": 1, "string": "Dimarts"},
        {"index": 2, "string": "Dimecres"},
        {"index": 3, "string": "Dijous"},
        {"index": 4, "string": "Divendres"}
    ];


    $scope.hourPicker = { "time": "", "weekday": $scope.weekdays[0]};

    var d = new Date();
        d.setHours( 8 );
        d.setMinutes( 0 );
    $scope.hourPicker.time = d;


    $scope.newGroupData = {
        "nom": "",
        "horaris": []
    };

    $scope.addToTimetable = function() {
        $scope.newGroupData.horaris.push({
            "time": $scope.hourPicker.time,
            "weekday": $scope.hourPicker.weekday
        });

        //console.log($scope.newGroupData.horaris);
    }

    $scope.deleteHour = function(index) {
        $scope.newGroupData.horaris.splice(index, 1);
    }

    $scope.createGroup = function() {
    	GroupModel.createGroup($scope.newGroupData).then(function(Group) {
            $scope.myGroups.push($scope.newGroupData);
            $scope.newGroupData.nom = "";
            $scope.newGroupData.horaris = [];

            $scope.$apply();

        }, function(Group, error) {
            console.log("There's been an error creating group: ", error);
        });
    	
    };

  }]);
