import { AppController} from '../root.component';

export class HomeController {
  parent: AppController;
  songs: {url:string}[];

  constructor() {
  }

  $onInit() {
    this.parent.newSongs(result => {
      this.songs = result;
    });
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
        <th translate>SONG</th>
        <th></th>
      </tr>
      <tr ng-repeat="song in $ctrl.songs">
        <td>{{ song.url }}</td>
        <td><button class="btn btn-sm btn-default" translate ng-click="$ctrl.playSong(song.url)">PLAY</button>
      </tr>
    </table>
  `,
  require: {
    parent: '^appRoot'
  }
}
