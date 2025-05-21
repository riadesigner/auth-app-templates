import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/api/auth/login')
  async login(@Req() req: any) {
    console.log('req ====', req);
    // const u = req.session.passport.user;
    // console.log('u ====', u);
    return { answer: 'ok' };
  }

  // @UseGuards(LoggedInGuard)
  @Get('/api/auth/logout')
  async logout(@Req() req) {
    await req.logout((): void => {});
    return { session: 'ended' };
  }

  @Get('/auth/yandex')
  async authYandex() {
    // return await this.authService.authYandex();
    return 'ok yandex!';
  }
}
