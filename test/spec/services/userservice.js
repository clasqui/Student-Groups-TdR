'use strict';

describe('Service: Userservice', function () {

  // load the service's module
  beforeEach(module('stugrApp'));

  // instantiate service
  var Userservice, credentials;
  beforeEach(inject(function (_Userservice_) {
    Userservice = _Userservice_;
    credentials = { 
      'username': 'jasmine',
      'password': 'M8Q-UZ5-5bG-sTP',
      'email': '',
      'first_name': '',
      'last_name': ''
    };

  }));

  beforeAll(function() {
    Parse.initialize("uwVnHZfS8WuM0ACmcOfbjhOl5n9t3y73HDM9q3NF", "BkEKop1rkA9eKLTbUkHkopFdupSCl8urmBceVxN8");
  });

  xit('should have internet connection', function() {
    var online = navigator.onLine;
    expect(online).toBeTruthy();
  })

  it('should do something', function () {
    expect(!!Userservice).toBe(true);
  });

  it('should login successfully', function(done) {
    Userservice.login(credentials).then(function(response) {

      expect(response).toBeDefined();
      done();

    }, function(reason) {
      done.fail(reason);
    });
  });

  it('should logout successfully', function() {
    Userservice.logOut();
    expect(Parse.User.current()).toBeNull();
    expect(Userservice.isAuthenticated()).toBeFalsy();
  });

  xit('should create a student account', function() {

  });

  xit('should creaete a coord account', function() {

  });

});
