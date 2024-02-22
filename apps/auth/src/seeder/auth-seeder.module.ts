import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { AuthSeederService } from './auth-seeder.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RolesModule, UsersModule],
  providers: [AuthSeederService],
  exports: [AuthSeederService],
})
export class AuthSeederModule {}
