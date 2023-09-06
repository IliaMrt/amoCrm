import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT);
  console.log(
    `Application started on ${process.env.APP_PORT} at ${new Date()}.`,
  );
}
bootstrap();
