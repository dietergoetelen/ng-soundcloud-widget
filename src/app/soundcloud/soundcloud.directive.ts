let template = <string>require('./soundcloud.html');
import { SC } from './soundcloud.service';

function scDirective(SC:any, $sce: angular.ISCEService, $parse) {
  let directive = {
    link,
    scope: {
      onRegisterApi: '&'
    },
    bindToController: true,
    controller: angular.noop,
    controllerAs: '$ctrl'
  };

  function link(scope: SCScope, element: ng.IAugmentedJQuery, attrs:SCAttributes) {
    const URL_PLACEHOLDER = "URL_PLACEHOLDER";
    const BASE_URL = "https://w.soundcloud.com/player/?url=";

    let widgetIframe, widget, onFinish = angular.noop;
    let options = {
      onFinish: (cb) => {
        onFinish = cb;
      },
      playSong: playSong
    };

    scope.$ctrl.onRegisterApi({api: options});

    function initializeTemplate(songUrl:string) {
      template = template.replace(URL_PLACEHOLDER, BASE_URL + encodeURIComponent(songUrl));
      element[0].innerHTML = template;
    }

    function playSong(song:any) {
      if (!widget || !widgetIframe) {
        initializeTemplate(song.url);
        widgetIframe = document.getElementById('sc-widget');
        widget       = SC.Widget(widgetIframe);
        widget.bind(SC.Widget.Events.FINISH, (...args) => {
          scope.$apply(onFinish);
        });

        widget.bind(SC.Widget.Events.PLAY, () => {
          //widget.seekTo(28000);
        });
      }

      widget.load(song.url, {
        callback: function() {
          widget.play();
        }
      });
    }
  }

  return directive;
}

export default [SC.iid, "$sce", "$parse", scDirective];

interface SCAttributes extends ng.IAttributes {
  song: string;
}

interface SCScope extends ng.IScope {
  $ctrl: {
    onRegisterApi: Function,
  },

  options: {
    onFinish: (cb:() => void) => void,
    playSong: Function
  }
}
