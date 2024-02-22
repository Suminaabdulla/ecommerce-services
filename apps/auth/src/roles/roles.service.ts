import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';
import { PaginationSearchDto } from '@app/common/dto/pagination-search.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}
  create(createRoleDto: CreateRoleDto) {
    const role = new Role({
      ...createRoleDto,
    });
    return this.rolesRepository.create(role);
  }

  findAll(paginationSearch: PaginationSearchDto<Role>) {
    return this.rolesRepository.findWithPagination(paginationSearch);
  }

  findOne(id: number) {
    return this.rolesRepository.findOne({ id });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.findOneAndUpdate({ id }, updateRoleDto);
  }

  remove(id: number) {
    return this.rolesRepository.findOneAndUpdate({ id }, { isDeleted: true });
  }
}
