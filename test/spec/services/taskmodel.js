'use strict';

describe('Service: TaskModel', function () {

  // load the service's module
  beforeEach(module('stugrApp'));

  // instantiate service
  var TaskModel;
  beforeEach(inject(function (_TaskModel_) {
    TaskModel = _TaskModel_;
  }));

  it('should do something', function () {
    expect(!!TaskModel).toBe(true);
  });

});
