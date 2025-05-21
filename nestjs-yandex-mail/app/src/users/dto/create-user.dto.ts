export class CreateUserDto {
  email: string;
  password: string;
  passwordHash: string;
  name?: string;
}

export class CreateUserExternalDto {
  email: string;
  name?: string;
}
