'use strict';

describe('Controller: GroupdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('stugrApp'));

  var GroupdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupdetailCtrl = $controller('GroupdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  
});
