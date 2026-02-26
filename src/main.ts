import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Uso de pipes de forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// ! git commit -a -m

// ? MYSQL
// ! npm i mysql2
// ! npm i @types/mysql2

//? POSTGRESQL
// ! nmp i pg
// ! npm i @types/pg -D