import 'angular';
import 'angular-mocks';
import 'app';

import { expect } from 'chai';
import { HomeController } from './home.component';
import { AppController } from '../root.component';

describe('HomeComponent', () => {
  let controller: HomeController,
      scope: ng.IScope,
      getSongsStub: Sinon.SinonSpy,
      playSongStub: Sinon.SinonSpy,
      songs: {url:string}[] = [{url: '1'}];

  beforeEach(angular.mock.module('app'));
  beforeEach(inject(($rootScope:ng.IRootScopeService, $componentController, $controller) => {
    scope = $rootScope.$new();
    controller = $componentController('appHome', {$scope: scope}, {});
    controller.parent = <any>{playSong: angular.noop, getSongs: angular.noop};

    getSongsStub = sinon.stub(controller.parent, 'getSongs').returns(songs);
    playSongStub = sinon.stub(controller.parent, 'playSong');
  }));

  afterEach(() => {
    sinon.restore(getSongsStub);
    sinon.restore(playSongStub);
  });

  it('should call parent to get songs', () => {
    controller.$onInit();

    expect(getSongsStub.calledOnce).to.be.true;
  });

  it('should have no initial songs', () => {
    expect(controller.songs).to.be.undefined;
  });

  it('should have songs after init', () => {
    controller.$onInit();

    expect(controller.songs.length).to.be.equal(1);
  });

  it('should call play song on parent controller', () => {
    controller.playSong('mySong');

    expect(playSongStub.calledOnce).to.be.true;
    expect(playSongStub.calledWith('mySong')).to.be.true;
  });
});
