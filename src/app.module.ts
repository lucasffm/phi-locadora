import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
