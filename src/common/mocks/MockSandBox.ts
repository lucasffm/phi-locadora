import { createSandbox, SinonSandbox } from 'sinon';
import * as typeorm from 'typeorm';

export class MockSandbox {
  sandbox: SinonSandbox;

  constructor(method: string | any, fakeData: any, args?: any) {
    this.sandbox = createSandbox();

    if (args) {
      this.sandbox.stub(typeorm, method).withArgs(args).returns(fakeData);
    } else {
      this.sandbox.stub(typeorm, method).returns(fakeData);
    }
  }

  close() {
    this.sandbox.restore();
  }
}
