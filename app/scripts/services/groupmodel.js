'use strict';

/**
 * @ngdoc service
 * @name stugrApp.GroupModel
 * @description
 * # GroupModel
 * Factory in the stugrApp.
 */
angular.module('stugrApp')
  .factory('GroupModel', ['$rootScope', '$q', 'USER_ROLES', function ($rootScope, $q, USER_ROLES) {
    // Service logic
    // ...
    var ParseGroup = Parse.Object.extend("Grup");

    // Properties
    ParseGroup.prototype.__defineGetter__("nom", function() {
      return this.get("nom");
    });
    ParseGroup.prototype.__defineSetter__("nom", function(aValue) {
      return this.set("nom", aValue);
    });

    ParseGroup.prototype.__defineGetter__("alumnes", function() {
      return this.get("alumnes");
    });
    ParseGroup.prototype.__defineSetter__("alumnes", function(aValue) {
      return this.set("alumnes", aValue);
    });

    ParseGroup.prototype.__defineGetter__("Professor", function() {
      return this.get("Professor");
    });
    ParseGroup.prototype.__defineSetter__("Professor", function(aValue) {
      return this.set("Professor", aValue);
    });

    ParseGroup.prototype.__defineGetter__("horari", function() {
      return this.get("horari");
    });
    ParseGroup.prototype.__defineSetter__("horari", function(aValue) {
      return this.set("horari", aValue);
    });


    var groupModel = {};


    // Public API here

    groupModel.createGroup = function(groupData) {
      //console.log(groupData);
      var newGroup = new ParseGroup();
      newGroup.set("nom", groupData.nom);
      newGroup.set("Professor", $rootScope.currentUser);
      newGroup.set("horari", groupData.horaris);

      var deferred = $q.defer();
      newGroup.save(null, {
        success: function(Group) {
          //console.log("New group object Created");
          deferred.resolve(Group);
        }, 
        error: function(Group, error) {
          //console.log('Failed to create new object, with error code: ' + error.message);
          deferred.reject(Group, error);
        }
      });

      return deferred.promise;
    };

    groupModel.getGroups = function() {
      var query = new Parse.Query(ParseGroup);
      var deferred = $q.defer();
      if($rootScope.currentUser.role() === USER_ROLES.alumne) {
        query.equalTo("alumnes", $rootScope.currentUser.id);
        query.find({
          success: function(results) {
            deferred.resolve(results);
          },
          error: function(aError) {
            deferred.reject(aError);
          }
        });

        return deferred.promise;
      } else {
        //console.log("Getting courses of this teacher");
        query.equalTo("Professor", Parse.User.current());
        query.find({
          success: function(results) {
            //console.log(results.length);
            deferred.resolve(results);
          },
          error: function(aError) {
            deferred.reject(aError);
          }
        });

        return deferred.promise;
      }

    };

    groupModel.getGroupWithId = function(id) {
      var query = new Parse.Query(ParseGroup);
      var deferred = $q.defer();

      query.equalTo("objectId", id);
      query.include("alumnes");
      query.include('Professor');

      query.first().then(function(result) {
        //console.log(result);
        deferred.resolve(result);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;

    };


    return groupModel;

  }]);
