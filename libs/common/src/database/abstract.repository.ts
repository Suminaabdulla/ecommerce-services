import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
  EntityManager,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginationSearchDto } from '../dto/pagination-search.dto';
import { ListData } from '../dto/list-data.dto';
import { UserDetailsDto } from '../dto/user-details.dto';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly entityRepository: Repository<T>,
    protected readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async createIfNotExists(where: FindOptionsWhere<T>, entity: T): Promise<T> {
    if (where) {
      const existingRecord = await this.entityRepository.findOne({
        where,
      });
      if (existingRecord) {
        return existingRecord;
      }
      return this.entityManager.save(entity);
    }
  }

  async findOne(where: FindOptionsWhere<T>, relations?: string[]): Promise<T> {
    const entity = await this.entityRepository.findOne({
      where,
      relations,
    });
    const entityName = this.getEntityName();
    if (!entity) {
      this.logger.warn('Entity was not found with where ', where);
      throw new NotFoundException(`${entityName} not found`);
    }
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );
    const entityName = this.getEntityName();
    if (!updateResult.affected) {
      this.logger.warn('Entity was not found with where ', where);
      throw new NotFoundException(`${entityName} not found`);
    }
    return this.findOne(where);
  }

  private getEntityName(): string {
    const entityTarget: EntityTarget<T> = this.entityRepository
      .target as EntityTarget<T>;
    const entityConstructor =
      entityTarget instanceof Function
        ? entityTarget
        : entityTarget.constructor;
    return entityConstructor.name;
  }

  async findAllEntities(
    entityName: string,
    currentUser?: UserDetailsDto,
    searchTerm?: string,
  ): Promise<T[]> {
    let query = `
      SELECT id, name, is_active as "isActive"
      FROM ${entityName}
      WHERE is_deleted = false
    `;

    if (searchTerm) {
      query += ` AND LOWER(name) LIKE LOWER($2)`;
    }

    const parameters: any[] = [];

    if (searchTerm) {
      parameters.push(`%${searchTerm}%`);
    }

    const entities = this.entityManager
      .getRepository(entityName)
      .query(query, parameters);

    return entities;
  }

  async findUserOwnedEntityWithPagination(
    paginationSearch: PaginationSearchDto<T>,
    currentUser?: UserDetailsDto,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<ListData<T>> {
    const take = paginationSearch.size;
    const skip = (paginationSearch.page - 1) * take;
    const order: FindOptionsOrder<T> =
      paginationSearch.orderBy || ({ id: 'DESC' } as FindOptionsOrder<T>);
    if (currentUser) {
      where = {
        ...where,
        isDeleted: false,
        userId: currentUser.id,
      };
    }
    const [result, total] = await this.entityRepository.findAndCount({
      where,
      relations,
      take,
      skip,
      order,
    });

    return {
      data: result,
      total: total,
    };
  }

  async findWithPagination(
    paginationSearch: PaginationSearchDto<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<ListData<T>> {
    const take = paginationSearch.size;
    const skip = (paginationSearch.page - 1) * take;
    const order: FindOptionsOrder<T> =
      paginationSearch.orderBy || ({ id: 'DESC' } as FindOptionsOrder<T>);
    where = { ...where, isDeleted: false };
    const [result, total] = await this.entityRepository.findAndCount({
      where,
      relations,
      take,
      skip,
      order,
    });

    return {
      data: result,
      total: total,
    };
  }
}
