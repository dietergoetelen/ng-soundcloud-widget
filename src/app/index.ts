import * as angular from 'angular';
import router from 'angular-ui-router';

import appComponent from './root';
import appHeader from './header';
import appFooter from './footer';
import appNavbar from './navbar';
import routeConfig from './routes.config';
import soundCloud from './soundcloud';

export default angular.module('app', [
  router,
  soundCloud.name,
  appComponent.name
])
  .component('appNavbar', appNavbar)
  .component('appFooter', appFooter)
  .component('appHeader', appHeader)
  .config(routeConfig)

  ;
