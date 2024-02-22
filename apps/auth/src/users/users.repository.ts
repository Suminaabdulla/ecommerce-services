import { Injectable, Logger } from '@nestjs/common';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AbstractRepository } from '@app/common/database/abstract.repository';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }
}
