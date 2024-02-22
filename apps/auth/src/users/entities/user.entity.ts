import { AbstractEntity } from '@app/common/database/abstract.entity';
import {
  Column,
  Entity,
  FindOptionsWhere,
  ILike,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ nullable: true })
  status: string;

  static getGenericTextSearchWhere(
    searchText?: string,
  ): FindOptionsWhere<User> {
    if (searchText) {
      return {
        name: ILike(`%${searchText}%`),
      };
    } else {
      return;
    }
  }
}
