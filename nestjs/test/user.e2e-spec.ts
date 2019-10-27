import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
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
    app.useGlobalPipes(new ValidationPipe());

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

    it('should activate', async () => {
      let newToken;
      const NEW_PASSWORD = 'mynewepassword';

      await request(app.getHttpServer())
        .post('/activation')
        .send({ password: NEW_PASSWORD })
        .set('Authorization', 'Bearer ' + creds.access_token)
        .expect(201)
        .expect(res => {
          expect(res.body.access_token).toBeTruthy();
          newToken = res.body.access_token;
        });

      // old login shouldn't work anymore
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'changeme' })
        .expect(401);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: NEW_PASSWORD })
        .expect(201);
    });
  });
});
