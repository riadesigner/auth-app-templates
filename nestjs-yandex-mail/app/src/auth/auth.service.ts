import { HttpException, Injectable } from '@nestjs/common';
import { iAuthService } from './dto/auth.abstract';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from '../users/dto/signIn-user.dto';
import { iUser } from 'src/users/dto/abstract-user';

@Injectable()
export class AuthService implements iAuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(user: SignInUserDto) {
    console.log('user', user);
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      throw new HttpException('Unknown user', 403);
    }
    if (!user || !(await compare(user.password, foundUser.passwordHash))) {
      throw new HttpException('Incorrect login or password', 403);
    }
    const { passwordHash, ...retUser } = foundUser;
    return retUser;
  }

  validateExternalUser(email: string): Promise<iUser> {
    throw new Error('Method not implemented.');
  }

}
