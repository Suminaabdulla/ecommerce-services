import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from 'apps/auth/src/users/entities/user.entity';

export class AbstractSellerOwnedEntity<T> extends AbstractEntity<T> {
  @Column({ name: 'user_id' })
  userId?: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(entity: Partial<T>) {
    super(entity);
    Object.assign(this, entity);
  }
}
