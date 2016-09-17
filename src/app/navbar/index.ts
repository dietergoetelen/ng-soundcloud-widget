export class AppNavbar {
  currentState:string;
  constructor($state) {
  }

  isActive(state: string) {
    return this.currentState && this.currentState.indexOf(state) >= 0;
  }
}

export default {
  controller: AppNavbar,
  bindings: {
    states: '=',
    currentState: '@'
  },
  template: `
  <ul class="nav nav-tabs">
    <li ng-class="{active: $ctrl.isActive(state.state)}" ng-repeat="state in $ctrl.states"><a ui-sref="{{state.state}}">{{state.title}}</a></li>
  </ul>
  `
}
