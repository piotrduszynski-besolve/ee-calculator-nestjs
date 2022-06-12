import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/calculator (POST)', () => {
    return request(app.getHttpServer())
      .post('/calculator')
      .set('Accept', 'application/json')
      .send(JSON.stringify({ equation: '2+3' }))
      .expect(201)
      .expect((res) => {
        res.body.equation = '2+3';
      });
  });
});
