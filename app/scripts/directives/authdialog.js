'use strict';

/**
 * @ngdoc directive
 * @name stugrApp.directive:authDialog
 * @description
 * # authDialog
 */
angular.module('stugrApp')
  .directive('authDialog', ['AUTH_EVENTS', function (AUTH_EVENTS) {
    return {
      template: '<div ng-if="visible">There was an authentication error</div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var showDialog = function (e) {
          alert(e)
          scope.visible = true;
        };
  
        scope.visible = false;
        scope.$on(AUTH_EVENTS.notAuthenticated, showDialog(AUTH_EVENTS.notAuthenticated));
        scope.$on(AUTH_EVENTS.sessionTimeout, showDialog(AUTH_EVENTS.sessionTimeout));
        scope.$on(AUTH_EVENTS.loginFailed, showDialog(AUTH_EVENTS.loginFailed));
      }
    };
  }]);
