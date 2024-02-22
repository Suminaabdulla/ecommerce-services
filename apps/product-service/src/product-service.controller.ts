import { Controller, Get } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';

@Controller('api/v1/product-service')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @Get()
  findAll() {
    return this.productServiceService.findAll();
  }
}
