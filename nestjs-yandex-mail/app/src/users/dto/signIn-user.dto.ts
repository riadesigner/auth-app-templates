import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 20)
  password: string;
}
