import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import configuration from './app/config/configuration';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api/v1';
  // app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../', 'web'));

  const port = configuration().port;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
