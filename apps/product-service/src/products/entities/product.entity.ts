import { AbstractSellerOwnedEntity } from '@app/common/database/abstract-seller-owned.entity';
import { Column, Entity, FindOptionsWhere, ILike } from 'typeorm';

@Entity()
export class Product extends AbstractSellerOwnedEntity<Product> {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  status: string;

  static getGenericTextSearchWhere(
    searchText?: string,
  ): FindOptionsWhere<Product> {
    if (searchText) {
      return {
        name: ILike(`%${searchText}%`),
      };
    } else {
      return;
    }
  }
}
