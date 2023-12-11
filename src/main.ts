import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appConfig(app);
  await app.listen(3000);
}

function appConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}
bootstrap();