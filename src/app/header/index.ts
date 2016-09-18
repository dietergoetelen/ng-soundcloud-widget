
export class AppHeader {
  $onInit() {
  }
}

export default {
  controller: AppHeader,
  bindings: {
    title: '@',
    setLanguage: '&'
  },

  template: `
  <div class="page-header">
    <h1>{{ $ctrl.title }} <small><a ng-click="$ctrl.setLanguage({lang: 'nl'})">nl</a> - <a ng-click="$ctrl.setLanguage({lang: 'en'})">en</a></small></h1>
  </div>
  `
};
