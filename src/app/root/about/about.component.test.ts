import { expect } from 'chai';

describe('AboutComponent', () => {
  let controller:any;
  
  beforeEach(angular.mock.module('app'));

  it('should have a title', () => {
    let title = 'About';


    expect(controller.title).to.be.equals(title);
  });
});
