import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsRepository extends AbstractRepository<Product> {
  protected readonly logger: Logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectRepository(Product)
    productRepository: Repository<Product>,
    entityManager: EntityManager,
  ) {
    super(productRepository, entityManager);
  }
}
