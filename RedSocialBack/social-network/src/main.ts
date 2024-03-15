import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/excepcions/exceptions.filter';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:4200',
    }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
