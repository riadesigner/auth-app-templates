import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserExternalDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser, iUsersService, ID } from './dto/abstract-user';

@Injectable()
export class UsersService implements iUsersService {
  private readonly users: iUser[] = [
    {
      _id: '1',
      name: 'Vaysa',
      email: 'vasya@mail.ru',
      passwordHash:
        '$2a$08$mAnp416RqQJPtgvmLjPj3.T4kbI22HqWbivv7YSAb7fuwy5WVxy5e',
      external: false,
    },
    {
      _id: '2',
      name: 'Petya',
      email: 'petya@mail.ru',
      passwordHash:
        '$2a$08$mAnp416RqQJPtgvmLjPj3.T4kbI22HqWbivv7YSAb7fuwy5WVxy5e',
      external: false,
    },
  ];
  async create(dto: CreateUserDto): Promise<iUser> {
    throw new Error('Method not implemented.');
  }
  async createExternal(dto: CreateUserExternalDto): Promise<iUser | null> {
    // let newId = parseInt(, 10);
    const newId = this.users.length + 1;
    const user: iUser = {
      _id: newId.toString(),
      email: dto.email,
      external: true,
    };
    this.users.push(user);
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<iUser> {
    return this.users.find((u) => u.email === email);
  }
  async findAll(): Promise<iUser[]> {
    return this.users;
  }
  async findById(idUser: ID): Promise<iUser> {
    return this.users.find((user) => user._id === idUser) || null;
  }
  async update(idUser: ID, dto: UpdateUserDto): Promise<iUser> {
    throw new Error('Method not implemented.');
  }
  async remove(idUser: ID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
