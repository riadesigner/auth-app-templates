import { CreateUserDto, CreateUserExternalDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export type ID = string;
export type UserPayload = { _id: ID; role: string };

export class iUser {
  _id: string;
  name?: string;
  email: string;
  passwordHash?: string;
  external: boolean;
}

export abstract class iUsersService {
  abstract create(dto: CreateUserDto): Promise<iUser | null>;
  abstract createExternal(dto: CreateUserExternalDto): Promise<iUser | null>;
  abstract findAll(): Promise<iUser[] | null>;
  abstract findByEmail(email: string): Promise<iUser | null>;
  abstract findById(idUser: ID): Promise<iUser | null>;
  abstract update(idUser: ID, dto: UpdateUserDto): Promise<iUser | null>;
  abstract remove(idUser: ID): Promise<boolean | null>;
}
