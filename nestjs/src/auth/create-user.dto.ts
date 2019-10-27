import { User } from './user.entity';

// Users should be generated unactive
// with a dummy password
export class CreateUserDto extends User {
  readonly name: string;
  readonly email: string;
}

// DTO doesn't validate the fields at compile time
type NewUserCompileTime = Pick<User, 'name' | 'email'>;

export function newUserCompileTime(c: NewUserCompileTime): User {
  const user = new User();
  user.name = c.name;
  user.email = c.email;
  user.password = 'changeme';
  user.isActive = false;

  return user;
}
