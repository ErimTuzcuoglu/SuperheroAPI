import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './modules/shared/middleware/filters/GlobalExceptionFilter';
import { TransformInterceptor } from './modules/shared/middleware/interceptors/TransformInterceptor';
import { EnvironmentVariables } from './config/environment/EnvironmentVariables';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);

  /* #region  Middlewares */
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  /* #endregion */
  app.use(helmet());

  if (configService.get(EnvironmentVariables.NODE_ENV) === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Superhero API')
      .setDescription('Superhero API description')
      .setVersion('1.0')
      .addTag('superhero')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    app
      .getHttpAdapter()
      .getInstance()
      .get('/', (req, res) => {
        res.redirect('/docs', 302);
      });
  }

  await app.listen(
    configService.get<number>(EnvironmentVariables.PORT) ?? 3000,
  );
}
bootstrap();
