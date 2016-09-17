import * as angular from 'angular';
import { SC } from './soundcloud.service';
import scDirective from './soundcloud.directive';

export default angular.module('app.sc', [])
  .service('SC', SC)
  .directive('scWidget', scDirective)
;
