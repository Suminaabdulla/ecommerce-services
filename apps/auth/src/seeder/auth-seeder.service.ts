import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RolesRepository } from '../roles/roles.repository';
import { Role } from '../roles/entities/role.entity';
import { ROLES } from '@app/common/enum/roles.enum';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthSeederService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async seed() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const admin = new Role({
      id: 1,
      name: ROLES.ADMIN,
      isActive: true,
      createdAt: new Date(),
      createdBy: 0,
      updatedAt: new Date(),
      updatedBy: 0,
      isDeleted: false,
    });
    this.rolesRepository.createIfNotExists({ name: ROLES.ADMIN }, admin);
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    const user = new User({
      id: 1,
      name: 'Admin',
      password: hashedPassword,
      email: 'contact@glam-seven.com',
      roleId: 1,
      role: admin,
      isActive: true,
      createdAt: new Date(),
      createdBy: 0,
      updatedAt: new Date(),
      updatedBy: 0,
      isDeleted: false,
    });
    this.usersRepository.createIfNotExists({ name: 'Admin' }, user);
  }
}
