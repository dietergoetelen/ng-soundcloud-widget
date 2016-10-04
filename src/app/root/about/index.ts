import * as angular from 'angular';
import aboutComponent from './about.component';
import { AboutService } from './about.service';

export default angular.module('app.root.about', [])
  .component('appAbout', aboutComponent)
  .service(AboutService.iid, AboutService)
  
;
