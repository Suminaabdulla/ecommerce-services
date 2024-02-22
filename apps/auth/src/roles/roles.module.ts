import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/role.entity';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  imports: [DatabaseModule.forFeature([Role])],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
