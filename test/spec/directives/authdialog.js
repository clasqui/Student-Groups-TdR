'use strict';

describe('Directive: authDialog', function () {

  // load the directive's module
  beforeEach(module('stugrApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile, AUTH_EVENTS) {
    element = angular.element('<auth-dialog></auth-dialog>');
    element = $compile(element)(scope);
    scope.$broadcast(AUTH_EVENTS.loginFailed);
    expect(element.text()).toBe('<div ng-if="visible">There was an authentication error</div>');
  }));
});
