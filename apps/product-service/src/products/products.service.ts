import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './product.repository';
import { UserDetailsDto } from '@app/common/dto/user-details.dto';
import { PaginationSearchDto } from '@app/common/dto/pagination-search.dto';
import { ROLES } from '@app/common/enum/roles.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto, user: UserDetailsDto) {
    try {
      const product = new Product({
        ...createProductDto,
        name: createProductDto.name,
        price: createProductDto.price,
        userId: user.id,
      });
      return await this.productRepository.create(product);
    } catch (error) {
      return { err: error };
    }
  }

  async findAll(
    paginationSearch: PaginationSearchDto<Product>,
    user: UserDetailsDto,
  ) {
    paginationSearch.orderBy = { price: 'ASC' };
    if (
      user.role.name.toLocaleUpperCase() === ROLES.ADMIN ||
      user.role.name.toLocaleUpperCase() === ROLES.CUSTOMER
    ) {
      return await this.productRepository.findWithPagination(
        paginationSearch,
        Product.getGenericTextSearchWhere(paginationSearch.search),
      );
    }
    return await this.productRepository.findUserOwnedEntityWithPagination(
      paginationSearch,
      user,
      Product.getGenericTextSearchWhere(paginationSearch.search),
      ['user'],
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.findOneAndUpdate(
      { id },
      updateProductDto,
    );

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const deletedProduct = await this.productRepository.findOneAndUpdate(
      { id },
      { isDeleted: true },
    );
    return {
      statusCode: 204,
      message: 'User ' + deletedProduct.name + ' has been deleted successfully',
    };
  }
}
