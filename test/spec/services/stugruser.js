'use strict';

describe('Service: StugrUser', function () {

  // load the service's module
  beforeEach(module('stugrApp'));

  // instantiate service
  var StugrUser;
  beforeEach(inject(function (_StugrUser_) {
    StugrUser = _StugrUser_;
  }));

  it('should do something', function () {
    expect(!!StugrUser).toBe(true);
  });

});
