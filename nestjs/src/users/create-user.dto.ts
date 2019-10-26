import { User } from './user.entity';

// Users should be generated unactive
// with a dummy password
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
}
