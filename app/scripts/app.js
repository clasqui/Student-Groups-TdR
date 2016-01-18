'use strict';

/**
 * @ngdoc overview
 * @name stugrApp
 * @description
 * # stugrApp
 *
 * Main module of the application.
 */
angular
  .module('stugrApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$urlRouterProvider', '$stateProvider', 'USER_ROLES', function ($urlRouterProvider, $stateProvider, USER_ROLES) {
    $urlRouterProvider.otherwise('/');

    var allAllowedData = {
          auth: true,
          authorizedRoles: [USER_ROLES.coord, USER_ROLES.professor, USER_ROLES.alumne]
        };

    $stateProvider
      .state('anon', {
        abstract: true,
        data: {
          auth: false
        }
      })
      .state('anon.login', {
        url: '/login',
        views: {
          'login@': {
            templateUrl: 'views/logIn.html'
          }
        },
        controller: 'AppCtrl',
        data: {}
      })
      .state('home', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html',
        data: allAllowedData
      })
      .state('dashboard', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        data: {
          auth: true,
          authorizedRoles: [USER_ROLES.coord]
        }
      })
      .state('courses', {
        url: '/cursos',
        templateUrl: 'views/group.html',
        data: allAllowedData,
        controller: 'GroupCtrl'
      })
      .state('courseDetail', {
        url: '/cursos/:id',
        templateUrl: 'views/groupdetail.html',
        data: allAllowedData,
        controller: 'GroupdetailCtrl'
      })
      .state('profile', {
        url: '/perfil',
        template: '<h1>El teu perfil</h1>',
        data: allAllowedData
      }).state('otherProfile', {
        url: '/perfil/:id',
        template: '<h1>EL perfil d\'algú altre</h1>',
        data: {
          auth: true,
          authorizedRoles: [USER_ROLES.coord, USER_ROLES.professor]
        }
      });
  }])
  .run(['$rootScope', 'Session', 'USER_ROLES', 'AUTH_EVENTS', 'Userservice', '$state', 'StugrUser', function($rootScope, Session, USER_ROLES, AUTH_EVENTS, Userservice, $state, StugrUser) {
      console.log("$stateChangeSuccess");
      var currentUser = Parse.User.current();
      if (currentUser) {
        console.log("We have a session");
        console.log(currentUser);
        Session.create(currentUser._sessionToken, currentUser);
        $rootScope.currentUser = currentUser;
      } else {
        Session.destroy();
      }
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, 
              fromState, fromParams) {
      console.log("$stateChangeStart");
      console.log(toState);
      if(toState.data.auth) {
    var authorizedRoles = toState.data.authorizedRoles;

    if (!Userservice.isAuthorized(authorizedRoles)) {
      console.log("Not Authorized");
      event.preventDefault();
      if (Userservice.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        $state.go('home');
      } else {
        console.log("User is not logged in");
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        $state.go('anon.login');
      }
    }
  }
    });
  }]);
