'use strict';

/**
 * @ngdoc service
 * @name stugrApp.StugrUser
 * @description
 * # StugrUser
 * Factory in the stugrApp.
 */
angular.module('stugrApp')
  .factory('StugrUser',['$rootScope', 'Userservice', 'USER_ROLES', function ($rootScope, Userservice, USER_ROLES) {
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

    // Public API here
    return User;
  }]);
