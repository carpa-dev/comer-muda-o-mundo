import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { AppModule } from '../src/app.module';
import { MockTypeOrmConfigService } from './test.utils';
import { TypeOrmConfigService } from '../src/typeorm.service';

describe('Users (e2e)', () => {
  let app;
  beforeAll(async () => {
    const mockTypeOrmConfig = new MockTypeOrmConfigService();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TypeOrmConfigService)
      .useValue(mockTypeOrmConfig)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should login successfully', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'changeme' })
      .expect(201);
  });

  describe('authorized requests', () => {
    let creds: any;
    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'changeme' });
      creds = res.body;
    });

    it('should get current user basic info', () => {
      return request(app.getHttpServer())
        .get('/me')
        .set('Authorization', 'Bearer ' + creds.access_token)
        .expect(200)
        .expect({
          userId: 1,
          email: 'test@example.com',
        });
    });
  });
});
