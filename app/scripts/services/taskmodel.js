'use strict';

/**
 * @ngdoc service
 * @name stugrApp.TaskModel
 * @description
 * # TaskModel
 * Factory in the stugrApp.
 */
angular.module('stugrApp')
  .factory('TaskModel', ['$rootScope', '$q', 'USER_ROLES', 'GroupModel', function ($rootScope, $q, USER_ROLES, GroupModel) {
    // Service logic
    // ...

    var ParseTask = Parse.Object.extend("Tasca");

    // Properties
    ParseTask.prototype.__defineGetter__("professor", function() {
      return this.get("professor");
    });
    ParseTask.prototype.__defineSetter__("professor", function(aValue) {
      return this.set("professor", aValue);
    });

    ParseTask.prototype.__defineGetter__("nom", function() {
      return this.get("nom");
    });
    ParseTask.prototype.__defineSetter__("nom", function(aValue) {
      return this.set("nom", aValue);
    });

    ParseTask.prototype.__defineGetter__("entrega", function() {
      return this.get("entrega");
    });
    ParseTask.prototype.__defineSetter__("entrega", function(aValue) {
      return this.set("entrega", aValue);
    });
    ParseTask.prototype.__defineGetter__("grup", function() {
      return this.get("grup");
    });
    ParseTask.prototype.__defineSetter__("grup", function(aValue) {
      return this.set("grup", aValue);
    });



    var taskModel = {};

    // Public API here

    taskModel.getTasksForGroup = function(groupId) {
      var query = new Parse.Query(ParseTask);
      var deferred = $q.defer();

      var Group = Parse.Object.extend("Grup");
      var group = new Group();
      group.id = groupId;

      query.equalTo("grup", group);
      // Just get the future tasks (Haha Cool Trick!)
      var d = new Date();
      d.setHours(0);
      query.greaterThanOrEqualTo("entrega", d);

      query.find({
        success: function(results) {
          console.log(results.length);
          deferred.resolve(results);
        },
        error: function(aError) {
          console.log("theres been an error: ", aError);
          deferred.reject(aError);
        }
      });

      return deferred.promise;
    };

    taskModel.createTask = function(nom, entrega, groupId) {
      var task = new ParseTask();
      task.set("nom", nom);
      task.set("entrega", entrega);

      var Group = Parse.Object.extend("Grup");
      var groupPosted = new Group();
      groupPosted.id = groupId;
      task.set("grup", groupPosted);

      task.set("professor", $rootScope.currentUser);

      var deferred = $q.defer();
      task.save(null, {
        success: function(task) {
          console.log("Saved");
          deferred.resolve(task);
        },
        error: function(task, error) {
          console.log("There's been an error saving task: ", error);
          deferred.reject(error);
        }
      });

      return deferred.promise;

    };

    taskModel.getMyTasks = function() {
      var deferred = $q.defer();

      GroupModel.getGroups().then(function(results) {
        var query = new Parse.Query(ParseTask);
        

        query.containedIn("grup", results);

        // Just get the today tasks (Haha Cool Trick!)
        var d = new Date();
        d.setHours(0,0,0,0);
        var dpo = new Date(d);
        dpo.setDate(dpo.getDate() + 1);

        query.greaterThanOrEqualTo("entrega", d);
        query.lessThan("entrega", dpo);

        query.include("professor");
        query.include("grup");
        query.limit(5);

        query.ascending("createdAt");

        query.find({
          success: function(results) {
            deferred.resolve(results);
          },
          error: function(aError) {
            deferred.reject(aError);
          }
        });
      },
      function(error) {
        console.log("Error hiar: ", error);
      });
      return deferred.promise;
    };

    return taskModel;
    
  }]);
