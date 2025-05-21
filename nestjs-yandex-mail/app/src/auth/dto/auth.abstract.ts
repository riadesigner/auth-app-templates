import { iUser } from 'src/users/dto/abstract-user';
import { SignInUserDto } from 'src/users/dto/signIn-user.dto';

export abstract class iAuthService {  
  abstract validateUser(user: SignInUserDto): Promise<iUser | null>;
  abstract validateExternalUser(email: string): Promise<iUser | null>;
}
