import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import configuration from './app/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api/v1';
  // app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const port = configuration().port;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
