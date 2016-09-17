
export class AppHeader {

}

export default {
  controller: AppHeader,
  bindings: {
    title: '@'
  },
  template: `
  <div class="page-header">
    <h1>{{ $ctrl.title }}</h1>
  </div>
  `
};
