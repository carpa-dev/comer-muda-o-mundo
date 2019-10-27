import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.setGlobalPrefix('/api/v2');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
