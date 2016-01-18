'use strict';

/**
 * @ngdoc function
 * @name stugrApp.controller:GroupdetailCtrl
 * @description
 * # GroupdetailCtrl
 * Controller of the stugrApp
 */
angular.module('stugrApp')
  .controller('GroupdetailCtrl', ['$rootScope', '$scope', 'GroupModel', 'Userservice', 'USER_ROLES', '$stateParams', '$state', 'NoteModel', 'TaskModel', 'StugrUser', function ($rootScope, $scope, GroupModel, Userservice, USER_ROLES, $stateParams, $state, NoteModel, TaskModel, StugrUser) {
    
  	$scope.isAuthorized = Userservice.isAuthorized;
    $scope.userRoles = USER_ROLES;

    $scope.groupNotes = [];
    $scope.groupTasks = [];
    $scope.studentsList = [];

	if($stateParams.id){
    	GroupModel.getGroupWithId($stateParams.id).then(function(result) {
            console.log(result);
    		$scope.groupData = result;

            StugrUser.getListOfStudents(result.alumnes).then(function (results) {
                console.log(results.length);
                $scope.studentsList = results;
            }, function(error) {
                console.log("there's been an error getting the students: ", error);
            });

    	}, function(error) {
    		console.log(error);
    	});

		NoteModel.getNotesForGroup($stateParams.id).then(function(otherResult) {
                console.log(otherResult);
                $scope.groupNotes = otherResult;
        }, function(error) {
            console.log("there's been an error getting notes: ", error);
        });

        TaskModel.getTasksForGroup($stateParams.id).then(function(taskResult) {
                console.log(taskResult);
                $scope.groupTasks = taskResult;
        }, function(error) {
            console.log("there's been an error getting tasks: ", error);
        });


        $scope.newNote = {
            "titol": "",
            "missatge": ""
        };

        $scope.newTask = {
            "nom": "",
            "entrega": new Date()
        };

        $scope.postNote = function() {
            if ($scope.newNote.missatge == "") {
                console.log("Write Something as the message");
                return;
            }

            NoteModel.createNote($scope.newNote.titol, $scope.newNote.missatge, $stateParams.id).then(function(note) {
                console.log("Good promise, update UI");
                $scope.newNote.titol = "";
                $scope.newNote.missatge = "";
                $scope.groupNotes.push(note);
            }).then(function(error) {

            });

        };

        $scope.popup1 = {
            opened: false
        };

        $scope.openCalendar = function() {
            $scope.popup1.opened = true;
        };

        //Disable Weekend
        $scope.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

        $scope.createTask = function() {
            if ($scope.newTask.nom == "" || $scope.newTask.entrega == "") {
                console.log("Write Something");
                return;
            }

            TaskModel.createTask($scope.newTask.nom, $scope.newTask.entrega, $stateParams.id).then(function(task) {
                console.log("Good promise, update UI");
                $scope.newTask.nom = "";
                $scope.newTask.entrega = new Date();
                $scope.groupTasks.push(task);
            }).then(function(error) {

            });
        };

        $scope.deleteNote = function(index) {
            var noteToBeDestroyed = $scope.groupNotes[index];
            noteToBeDestroyed.destroy({
                success: function(object) {
                    console.log("successfully deleted");
                    $scope.groupNotes.splice(index, 1);
                    $scope.$apply();
                },
                error: function(object, error) {
                    console.log("There's been an error deleting the note: ", error);
                }
            });

        };

        $scope.deleteTask = function(index) {
            var taskToBeDestroyed = $scope.groupTasks[index];
            taskToBeDestroyed.destroy({
                success: function(object) {
                    console.log("successfully deleted");
                    $scope.groupTasks.splice(index, 1);
                    $scope.$apply();
                }
            })
        };

        $scope.deleteStudent = function(id, index) {
            $scope.groupData.remove("alumnes", id);
            $scope.groupData.save();
            $scope.studentsList.splice(index, 1);

        }

        $scope.getAllStudents = function(val) {
            return StugrUser.searchAllStudents(val).then(function(results) {
                console.log(results);
                return results;
            }, function(error) {

            });
        };

        
        $scope.addStudent = function(user) {
            $scope.groupData.addUnique("alumnes", user.id);
            $scope.groupData.save();
            $scope.studentsList.push(user);
        };

        $scope.changeName = function() {
            $scope.groupData.save();
        }


    } else {
    	console.log("No ID provided");
    	$state.go('courses');
    }

  }]);
