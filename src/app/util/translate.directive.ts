import { TranslateService } from './translate.provider';

export default translateDirective;

translateDirective.$inject = [TranslateService.iid, '$interpolate'];
function translateDirective(translateService:TranslateService, $interpolate:ng.IInterpolateService) {
  let directive = {
    restrict: "A",
    link
  };

  function link(scope:ng.IScope, element:angular.IAugmentedJQuery, attrs) {
    let key = element[0].innerHTML;

    scope.$watch(() => translateService['currentLanguage'], translate)

    function translate() {
      let translation = translateService.translate($interpolate(key)(scope));
      element[0].innerHTML = translation;
    }
  }

  return directive;
}
