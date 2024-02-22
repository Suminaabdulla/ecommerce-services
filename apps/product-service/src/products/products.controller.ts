import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { UserDetailsDto } from '@app/common/dto/user-details.dto';
import { PaginationSearch } from '@app/common/decorators/pagination-search.decorator';
import { PaginationSearchDto } from '@app/common/dto/pagination-search.dto';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';

@Controller('api/v1/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserDetailsDto,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @PaginationSearch() paginationSearch: PaginationSearchDto<Product>,
    @CurrentUser() user: UserDetailsDto,
  ) {
    return this.productsService.findAll(paginationSearch, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
