import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Uso de pipes de forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  // ? Configuracion de swagger
  const config = new DocumentBuilder()
  .setTitle('API con vulnerabilidades de seguridad')
  .setDescription('Documentación de la API para pruebas')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)

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

// ? SWAGGER
// ! npm i @nestjs/swagger

// ! git commit 