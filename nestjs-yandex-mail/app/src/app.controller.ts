import { Controller, Get, Render, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UserPayload } from './users/dto/abstract-user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  @Render('index')
  async homepage() {
    return { user: null };
  }

  @Get('/login')
  @Render('login')
  async login(@Res() res: any, @Session() ses: any) {
    const u: UserPayload =
      ses.passport && ses.passport.user ? ses.passport.user : null;
    if (u) {
      const user = await this.userService.findById(u._id);
      return { user };
    }
    return { user: null };
  }

}
