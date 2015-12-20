'use strict';

xdescribe('Controller: GroupCtrl', function () {

  // load the controller's module
  beforeEach(module('stugrApp'));

  var GroupctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupctrlCtrl = $controller('GroupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GroupctrlCtrl.awesomeThings.length).toBe(3);
  });
});
