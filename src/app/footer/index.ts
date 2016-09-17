require('./footer.less');

export default {
  transclude: true,
  template: `
  <footer class="footer">
    <div ng-transclude></div>
  </footer>
  `
}
