import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
