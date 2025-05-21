import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);
    await super.logIn(context.switchToHttp().getRequest());
    return result as boolean;
  }
}
