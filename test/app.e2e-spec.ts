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

  it('/calculator (POST)', async () => {
    const test = await request(app.getHttpServer())
      .post('/calculator')
      .set('Accept', 'application/json')
      .send({ equation: '2+3' })
      .expect(201);

    expect(test.body.brand).toBe('Test Brand');
    expect(test.body.equation).toBe('2+3');
    expect(test.body.result).toBe(5);
  });

  it('/calculator (POST) - wrong equation', async () => {
    const test = await request(app.getHttpServer())
      .post('/calculator')
      .set('Accept', 'application/json')
      .send({ equation: '2+a' })
      .expect(201);

    expect(test.body.msg).toBe('Wrong Equation: 2+a');
  });

  it('/calculator (POST) - divide by zero', async () => {
    const test = await request(app.getHttpServer())
      .post('/calculator')
      .set('Accept', 'application/json')
      .send({ equation: '2/0' })
      .expect(201);

    expect(test.body.msg).toBe('Wrong Equation: 2/0');
  });
});
