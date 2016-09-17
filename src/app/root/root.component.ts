export class AppController {
  private title = 'Musify';
  private states = [
    {
      title: 'Home',
      state: 'app.home'
    },
    {
      title: 'About',
      state: 'app.about'
    }
  ];
  private songIndex = -1;
  private songs: {url:string}[];
  private api;

  static $inject = ['$state', '$timeout'];
  constructor(private $state:ng.ui.IStateService, private $timeout: ng.ITimeoutService) {}

  $onInit() {
    this.songs = [
      { url: 'http://api.soundcloud.com/tracks/251059513'},
      { url: 'http://api.soundcloud.com/tracks/245673410'},
      { url: 'http://api.soundcloud.com/tracks/263284333'},
      { url: 'http://api.soundcloud.com/tracks/1848538'}
    ];

  }

  public getSongs() {
    return this.songs;
  }

  public playSong(url: string) {
    let index = 0;
    // find the index of the url
    for(let i = 0; i < this.songs.length; i += 1) {
      if (this.songs[i].url === url) {
        index = i;
        break;
      }
    }
    this.songIndex = index;

    this.api && this.api.playSong({url});
  }

  private getNextSong() {
    this.songIndex++;

    if (!this.songs[this.songIndex]) {
      this.songIndex = 0;
    }
    return this.songs[this.songIndex];
  }

  public onRegister(api) {
    this.api = api;
    api.onFinish(() => {
      api.playSong(this.getNextSong());
    });
    api.playSong(this.getNextSong());
  }
}

export default {
  controller: AppController,
  template: `
  <div class="container">
    <div class="row">
      <app-header title="{{ $ctrl.title }}"></app-header>
      <app-navbar current-state="{{ $ctrl.$state.current.name }}" states="$ctrl.states"></app-navbar>
      <p>Currently playing song nr: {{ $ctrl.songIndex }}</p>
      <div ui-view></div>
    </div>
  </div>
  <app-footer>
    <sc-widget on-register-api="$ctrl.onRegister(api)"></sc-widget>
  </app-footer>
  `
};
