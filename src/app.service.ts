import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Phi Locadora',
      docs: `${process.env.VIRTUAL_HOST}/docs`,
      version: '1.0.0',
    };
  }
}
