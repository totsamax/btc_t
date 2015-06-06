  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  // 'starter.services' is found in services.js
  // 'starter.controllers' is found in controllers.js
  var app = angular.module('app', ['ionic', 'ngStorage']);

  app.run(function ($ionicPlatform, $state, $rootScope) {
      $ionicPlatform.ready(function () {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
          }
          if (window.localStorage.getItem("ngStorage-phone") === null || window.localStorage.getItem("ngStorage-phone") === "" || window.localStorage.getItem("ngStorage-phone") === undefined) {
              $rootScope.hideTabs = true;
              $state.go('check');
          } else {

              $state.go('page');
          }
      });
  });

  app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
          .state('modal', {
              url: '/modal',
              templateUrl: 'pages/order.html'
          })
          .state('page', {
              url: '/',
              templateUrl: 'pages/page.html'
          }).state('check', {
              cache: true,
              url: '/check',
              templateUrl: 'pages/check.html',
              controller: 'Check'
          });

      // if none of the above states are matched, use this as the fallback

      $urlRouterProvider.otherwise('/');
      $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
      $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
      window.client = new Pusher('69184d320f45f3ebdd06');

  });