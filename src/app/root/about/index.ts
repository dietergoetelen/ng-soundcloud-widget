import * as angular from 'angular';
import aboutComponent from './about.component';

export default angular.module('app.root.about', [])
  .component('appAbout', aboutComponent)
;
