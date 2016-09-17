import { AppController} from '../root.component';

export class HomeController {
  parent: AppController;
  songs: {url:string}[];

  constructor() {
  }

  $onInit() {
    this.songs = this.parent.getSongs();
  }

  playSong(url: string) {
    this.parent.playSong(url);
  }
}

export default {
  controller: HomeController,
  template: `
    <table class="table">
      <tr>
        <th>Song</th>
        <th></th>
      </tr>
      <tr ng-repeat="song in $ctrl.songs">
        <td>{{ song.url }}</td>
        <td><button class="btn btn-sm btn-default" ng-click="$ctrl.playSong(song.url)">Play</button>
      </tr>
    </table>
    <ul>
      <li></li>
    </ul>
  `,
  require: {
    parent: '^appRoot'
  }
}
