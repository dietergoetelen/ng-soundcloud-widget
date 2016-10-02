import * as angular from 'angular';
import appRoot from './root.component';
import appHome from './home';
import appAbout from './about';

export default angular.module('app.root', [
  appHome.name,
  appAbout.name
])
  .component('appRoot', appRoot)
  ;
