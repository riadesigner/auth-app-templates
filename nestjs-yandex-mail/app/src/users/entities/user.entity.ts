import { iUser } from '../dto/abstract-user';

export class UserEntity implements iUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  external: boolean;
}
