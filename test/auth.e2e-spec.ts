import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup event', () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({email: "newme@gmail.com", password: "298354"})
      .expect(201)
      .then((res) => {
        const { email, id } = res.body
        expect(id).toBeDefined()
        expect(email).toEqual("newme@gmail.com")
      })
  });
});
