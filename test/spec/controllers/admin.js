'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('stugrApp'));

  var AdminCtrl,
    scope;

    beforeAll(function() {
      Parse.initialize("uwVnHZfS8WuM0ACmcOfbjhOl5n9t3y73HDM9q3NF", "BkEKop1rkA9eKLTbUkHkopFdupSCl8urmBceVxN8");
    });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have an object for the new user', function () {
    expect(Object.keys(scope.newUser).length).toBe(5);
  });

  // Deprecated because no callback, check Userservice test
  xit("should create a student account", function() {
    scope.newUser.username = "studentTest";
    scope.newUser.email = "test@example.com";
    scope.newUser.first_name = "Student";
    scope.newUser.last_name = "Jasmine";
    scope.newUser.type = "0";

    scope.doCreate();

  });
});
