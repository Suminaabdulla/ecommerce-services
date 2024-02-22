import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/common/database/database.module';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RolesRepository],
  imports: [DatabaseModule.forFeature([User, Role])],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
