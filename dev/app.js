var angular = require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-aria');
require('angular-material');

var cfg = require('./../cfg.json'),
  controllers = require('./js/controllers'),
  directives = require('./js/directives'),
  factories = require('./js/factories'),
  services = require('./js/services');

angular
  .module('app', [
    'ui.router',
    'ngMaterial',
    controllers.name,
    directives.name,
    factories.name,
    services.name
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        views: {
          "": {
            templateUrl: "tpl/home.html"
          }
        }
      })
  })
  .constant('title', cfg.title)
  .constant('version', cfg.version)
  // .run(function ($log, title, version) {
  //   $log.info('App: ' + title + ' has started, Version: ' + version);
  // });
