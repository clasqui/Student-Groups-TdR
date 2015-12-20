'use strict';

describe('Service: GroupModel', function () {

  // load the service's module
  beforeEach(module('stugrApp'));

  // instantiate service
  var GroupModel;
  beforeEach(inject(function (_GroupModel_) {
    GroupModel = _GroupModel_;
  }));

  it('should do something', function () {
    expect(!!GroupModel).toBe(true);
  });

});
