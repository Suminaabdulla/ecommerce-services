import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';
import { AuthSeederService } from './seeder/auth-seeder.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  const HTTP_PORT: number = configService.get('HTTP_PORT');

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('Auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const seeder = app.get(AuthSeederService);
  await seeder.seed();
  await app.startAllMicroservices();
  await app.listen(HTTP_PORT);
}
bootstrap();
