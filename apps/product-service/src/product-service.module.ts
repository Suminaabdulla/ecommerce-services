import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ProductServiceService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
  imports: [
    ProductsModule,
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
      }),
    }),
  ],
})
export class ProductServiceModule {}
