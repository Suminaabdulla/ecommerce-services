import { FindOptionsOrder } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';

export class PaginationSearchDto<T extends AbstractEntity<T>> {
  page: number = 1;
  size: number = 10;
  search?: string;
  orderBy?: FindOptionsOrder<T>;
}
