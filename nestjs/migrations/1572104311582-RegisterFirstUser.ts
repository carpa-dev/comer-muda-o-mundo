import { MigrationInterface, getRepository, QueryRunner } from 'typeorm';
import { newUserCompileTime } from '../src/auth/create-user.dto';
import { User } from '../src/auth/user.entity';

const USER = {
  name: 'admin',
  email: 'contato@carpa.dev',
};
export class RegisterFirstUser1572104311582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const firstUser = newUserCompileTime(USER);

    await getRepository(User).save(firstUser);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const user = await getRepository(User).findOne({
      where: {
        email: USER.email,
      },
    });

    await getRepository(User).remove(user);
  }
}
