'use strict';

/**
 * @ngdoc service
 * @name stugrApp.StugrUser
 * @description
 * # StugrUser
 * Factory in the stugrApp.
 */
angular.module('stugrApp')
  .factory('StugrUser',['$rootScope', 'Userservice', 'USER_ROLES', '$q', function ($rootScope, Userservice, USER_ROLES, $q) {
    // Service logic
    // ...
    var User = Parse.User.extend({
      // Instance methods
      role : function() {
        console.log("Getting role with the extended method");
        var role;
        if(this.get("coordinador")){
          role = USER_ROLES.coord;
        } else if (this.get("professor")) {
          role = USER_ROLES.professor;
        } else {
          role = USER_ROLES.alumne;
        }
        console.log(role);
        return role
      }

    }, {
      // Class Methods


    });

    User.prototype.__defineGetter__("first_name", function() {
      return this.get("first_name");
    });
    User.prototype.__defineSetter__("first_name", function(aValue) {
      return this.set("first_name", aValue);
    });

    User.prototype.__defineGetter__("last_name", function() {
      return this.get("last_name");
    });
    User.prototype.__defineSetter__("last_name", function(aValue) {
      return this.set("last_name", aValue);
    });
    User.prototype.__defineGetter__("full_name", function() {
      return this.get("first_name") + " " + this.get("last_name");
    });

    // Public API here

    User.getListOfStudents = function(array) {
      var userQuery = new Parse.Query(User);
      var deferred = $q.defer();
      console.log(array)

      userQuery.containedIn("objectId", array);
      userQuery.find({
        success: function(results) {
          console.log("YAAAY: ", results);
          deferred.resolve(results);
        },
        error: function(aError) {
          deferred.reject(aError);
        }
      });

      return deferred.promise;
    };

    User.searchAllStudents = function(searchQuery) {
      var deferred = $q.defer();

      // Only users with role alum

      // Set the query for name and username
      var queryFirst = new Parse.Query(User);
      queryFirst.startsWith("first_name", searchQuery);
      queryFirst.exists("alumne");
      var queryLast = new Parse.Query(User);
      queryLast.startsWith("last_name", searchQuery);
      queryLast.exists("alumne");

      var mainQuery = Parse.Query.or(queryFirst, queryLast);
      mainQuery.limit(10);

      mainQuery.find({
        success: function(results) {
          console.log(results);
          deferred.resolve(results);
        }, 
        error: function(aError) {
          console.log("Theres been an error searching for users");
          deferred.reject(aError);
        }
      });

      return deferred.promise;

    }

    return User;
  }]);
