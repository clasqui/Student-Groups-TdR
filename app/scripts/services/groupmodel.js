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


    var groupModel = {};


    // Public API here

    groupModel.createGroup = function(name) {
      var newGroup = new ParseGroup();
      newGroup.set("nom", name);
      newGroup.set("Professor", $rootScope.currentUser);

      newGroup.save(null, {
        success: function(Group) {
          console.log("New group object Created");
        }, 
        error: function(Group, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
    };

    groupModel.getGroups = function() {
      var query = new Parse.Query(ParseGroup);
      var deferred = $q.defer();
      if($rootScope.currentUser.role() == USER_ROLES.alumne) {

      } else {
        console.log("Getting courses of this teacher");
        query.equalTo("Professor", Parse.User.current());
        query.find({
          success: function(results) {
            console.log(results.length);
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
      query.include('alumnes.first_name');
      query.include('Professor');
      query.first().then(function(result) {
        console.log(result);
        deferred.resolve(result);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;

    }


    return groupModel;

  }]);
