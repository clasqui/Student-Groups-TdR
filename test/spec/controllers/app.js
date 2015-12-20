'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('stugrApp'));

  var AppCtrl,
    scope,
    x;

    beforeAll(function() {
      Parse.initialize("uwVnHZfS8WuM0ACmcOfbjhOl5n9t3y73HDM9q3NF", "BkEKop1rkA9eKLTbUkHkopFdupSCl8urmBceVxN8");
    });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Userservice) {
    scope = $rootScope.$new();
    x = Userservice;
    AppCtrl = $controller('AppCtrl', {
      $scope: scope,
      // place here mocked dependencies
    });
    scope.userCredentials.username = "jasmine";
    scope.userCredentials.password = "M8Q-UZ5-5bG-sTP";
    scope.mockData = {
      userId: '',
      session: ''
    }
  }));

  it('should have a Student Groups as codename', function () {
    expect(scope.codename).toBe("Student Groups");
  });
  it('should have a dictionary to store the credentials', function() {
    expect(Object.keys(scope.userCredentials).length).toBe(5);
  });

  xit('should detect jasmine user as an admin', function(done) {
    x.login(scope.userCredentials).then(function() {
      
      scope.checkRole(function(result) {
        expect(result).toBeTruthy();
        done();
      });
      
    }, function(reason) {
      done.fail(reason);
    });

  });

});
