import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './product.repository';
import { DatabaseModule } from '@app/common/database/database.module';
import { Product } from './entities/product.entity';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { AuthClientHttpService } from '@app/common/auth/auth-client-http.service';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import { Role } from 'apps/auth/src/roles/entities/role.entity';
import { AdminGuard } from '@app/common/auth/admin.guard';

@Module({
  controllers: [ProductsController],
  providers: [
    JwtAuthGuard,
    ProductsService,
    ProductsRepository,
    AuthClientHttpService,
    AdminGuard,
  ],
  imports: [HttpModule, DatabaseModule.forFeature([Product, User, Role])],
  exports: [JwtAuthGuard, AuthClientHttpService, AdminGuard],
})
export class ProductsModule {}
