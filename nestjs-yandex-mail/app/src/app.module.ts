import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { hashSync } from 'bcryptjs';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {

    const hash = hashSync('pass', 8);
    console.log('hash===',hash)    

  }
  configure(consumer: MiddlewareConsumer) {}
}
