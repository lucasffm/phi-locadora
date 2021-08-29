import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Phi Locadora',
      docs: `http://${process.env.VIRTUAL_HOST}/docs`,
    };
  }
}
