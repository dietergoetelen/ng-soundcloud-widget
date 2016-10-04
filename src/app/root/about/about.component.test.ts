import { expect } from 'chai';
import { AboutService } from './about.service';

describe('AboutComponent', () => {
  let controller:any,
      getInfoStub: Sinon.SinonSpy,
      scope: ng.IScope,
      deferred: ng.IDeferred<string>;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($q:ng.IQService, $rootScope, $componentController, _AboutService_:AboutService) => {
    scope = $rootScope.$new();
    deferred = $q.defer();
    controller = $componentController('appAbout', {
      $scope: scope,
      AboutService: _AboutService_
    });

    getInfoStub = sinon.stub(_AboutService_, 'getInfo').returns(deferred.promise);
  }));

  it('should have a title', () => {
    let title = 'About';
    expect(controller.title).to.be.equals(title);
  });

  it('should call getInfo $onInit', () => {
    controller.$onInit();
    expect(getInfoStub.calledOnce).to.be.true;
  });

  it('should have info after $onInit', () => {
    controller.$onInit();

    deferred.resolve('info');
    scope.$apply();

    expect(controller.info).to.be.equals('info');
  });

  it('should have an error message once getInfo fails', () => {
    controller.$onInit();

    deferred.reject();
    scope.$apply();

    expect(controller.error).to.not.be.undefined;
    expect(controller.error).to.be.equals('Getting info was on a fail train');
  });

  it('should have no error message once getInfo succeed', () => {
    controller.error = 'error';

    controller.$onInit();
    deferred.resolve('info');
    scope.$apply();

    expect(controller.error).to.be.undefined;
  });

  it('should have no info once getInfo fails', () => {
    controller.info = 'info';

    controller.$onInit();
    deferred.reject();
    scope.$apply();

    expect(controller.info).to.be.undefined;
  });
});
