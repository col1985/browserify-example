'use strict';

var angular = require('angular');

module.exports = angular.module('app.controllers', [])
  .controller('AppCtrl', require('./app-control.js'));
