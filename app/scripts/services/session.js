'use strict';

/**
 * @ngdoc service
 * @name stugrApp.Session
 * @description
 * # Session
 * Service in the stugrApp.
 */
angular.module('stugrApp')
  .service('Session', [function () {

  this.create = function (sessionId, userId) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userId.role();
  };


  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  }]);
