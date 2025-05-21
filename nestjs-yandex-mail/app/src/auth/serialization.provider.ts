import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserPayload } from '../users/dto/abstract-user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    const payload: UserPayload = { _id: user._id, role: user.role };
    done(null, payload);
  }

  async deserializeUser(payload: UserPayload, done: CallableFunction) {
    return await this.usersService
      .findById(payload._id)
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
