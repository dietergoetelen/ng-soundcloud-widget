import * as angular from 'angular';
import homeComponent from './home.component';

export default angular.module('app.root.home', [])
  .component('appHome', homeComponent)
  ;
