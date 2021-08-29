import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import JwtAuthenticationGuard from './modules/auth/strategies/jwt-authentication.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
