import {TranslateService} from '../util/translate.provider';

let firebase:any = require('firebase');
let config = {
  databaseURL: 'https://rd-musify.firebaseio.com/'
};

firebase.initializeApp(config);
let ref = firebase.database().ref();

export class AppController {
  private title = 'Musify';
  private states = [
    {
      title: 'NAV_HOME',
      state: 'app.home'
    },
    {
      title: 'NAV_ABOUT',
      state: 'app.about'
    }
  ];
  private songIndex = -1;
  private songs: {url:string}[];
  private api;

  static $inject = ['$state', TranslateService.iid, '$firebaseObject', '$scope'];
  constructor(private $state:ng.ui.IStateService, private translateService: TranslateService, private $firebaseObject, private $scope:ng.IScope) {}

  isPlaying:boolean = false;
  $onInit() {
    ref.child('playing').on('value',  (snapshot:any) => {
      this.$scope.$apply(() => {
        if (snapshot.val().currentTime === 0 || !this.isPlaying) {
          this.isPlaying = true;
          this.api.playSong({url: snapshot.val().uri, time: snapshot.val().currentTime});
        }
      });
    });

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

  public onRegister(api: {onFinish: Function, playSong: ({url:string}) => void}) {
    this.api = api;
    /*
    this.api = api;
    api.onFinish(() => {
      api.playSong(this.getNextSong());
    });
    api.playSong(this.getNextSong());
    */
  }

  public setLanguage(lang:string) {
    this.translateService.setLanguage(lang);
  }
}

export default {
  controller: AppController,
  template: `
  <div class="container">
    <div class="row">
      <app-header set-language="$ctrl.setLanguage(lang)" title="{{ $ctrl.title }}"></app-header>
      <app-navbar current-state="{{ $ctrl.$state.current.name }}" states="$ctrl.states"></app-navbar>
      <p><span translate>CURRENTLY_PLAYING</span> {{ $ctrl.songIndex }}</p>
      <div ui-view></div>
    </div>
  </div>
  <app-footer>
    <sc-widget on-register-api="$ctrl.onRegister(api)"></sc-widget>
  </app-footer>
  `
};
