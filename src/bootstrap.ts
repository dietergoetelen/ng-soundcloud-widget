require('!!file?name=[name].[ext]!./index.html');
require('bootstrap/dist/css/bootstrap.css');
require('./soundcloud.js');
require('firebase');

let fb = require('angularfire');

import * as angular from 'angular';
import appModule from './app/index';

angular.element(document).ready(() => {
  angular.bootstrap(document, [
    <any>fb,
    appModule.name
  ]);
});
