import translateConfig from './translate.config';
import {TranslateService, TranslateServiceProvider} from'./translate.provider';
import translateDirective from './translate.directive';

export default angular.module('app.util', [])
  .directive('translate', translateDirective)
  .provider(TranslateService.iid, TranslateServiceProvider)
  .config(translateConfig);
