import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ProductServiceModule } from './product-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ProductServiceModule);
  const configService = app.get(ConfigService);

  const HTTP_PORT: number = configService.get('HTTP_PORT');

  const config = new DocumentBuilder()
    .setTitle('Product Service')
    .setDescription('Product API description')
    .setVersion('1.0')
    .addTag('product')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(HTTP_PORT);
}
bootstrap();
