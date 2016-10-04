import { AboutService } from './about.service';
import { expect } from 'chai';

describe('AboutService', () => {
  let aboutService:AboutService,
      scope:ng.IScope;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($rootScope:ng.IRootScopeService, _AboutService_) => {
    scope = $rootScope.$new();
    aboutService = _AboutService_;
  }));

  it('should return info', (done) => {

    
    aboutService.getInfo().then(result => {
      expect(result).to.be.equals('Some information about this app');
      done();
    });

    scope.$apply();
  });
});
