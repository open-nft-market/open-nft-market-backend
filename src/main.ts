import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as requestIp from 'request-ip';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import useragent from 'express-useragent';
import 'dotenv/config';
import { AppModule } from './app.module';
import morgan from './middlewares/morgan';

const { PORT = 3000, APP_NAME = 'OngamaNft backend', APP_VERSION = '1.0' } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('v1');
  app.use(requestIp.mw());
  app.use(useragent.express());
  app.use(morgan());

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} is an API that serves a nft marketplace web app`)
    .setVersion(APP_VERSION)
    .addTag('OngaNFTs-API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();
