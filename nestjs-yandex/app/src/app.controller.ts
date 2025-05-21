import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async root() {
    return { user: null };
  }

  @Get('/profile')
  profile(): string {
    return 'profile!';
  }

}
