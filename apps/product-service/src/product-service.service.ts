import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductServiceService {
  findAll() {
    return `This action returns all productService`;
  }
}
