import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from 'apps/auth/src/roles/entities/role.entity';
import { AbstractRepository } from '@app/common/database/abstract.repository';

@Injectable()
export class RolesRepository extends AbstractRepository<Role> {
  protected readonly logger: Logger = new Logger(RolesRepository.name);

  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
    entityManager: EntityManager,
  ) {
    super(roleRepository, entityManager);
  }
}
