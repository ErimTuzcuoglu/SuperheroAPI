/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GlobalExceptionFilter } from '../src/modules/shared/middleware/filters/GlobalExceptionFilter';
import { TransformInterceptor } from '../src/modules/shared/middleware/interceptors/TransformInterceptor';

describe('SuperheroController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    /* #region  Middlewares */
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    /* #endregion */

    await app.init();
    await app.getHttpAdapter().getInstance().ready(); // Fastify'nin hazır olmasını bekle
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/superhero (POST) should add a superhero', async () => {
    const hero = {
      name: 'Iron Man',
      superpower: 'Genius-level intellect',
      humilityScore: 7,
    };

    const response = await request(app.getHttpServer())
      .post('/api/superhero')
      .send(hero)
      .expect(201);

    expect(response.body.data).toMatchObject(hero);
  });

  it('/api/superhero (GET) should return superheroes sorted by humilityScore', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/superhero')
      .expect(200);

    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data).toEqual(
      response.body.data.sort((a, b) => b.humilityScore - a.humilityScore),
    );
  });
});
