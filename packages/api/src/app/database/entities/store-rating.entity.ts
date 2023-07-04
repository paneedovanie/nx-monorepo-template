import {
  Entity,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';

@Entity('store_ratings')
export class StoreRatingEntity {
  @PrimaryColumn()
  storeId: string;

  @ManyToOne(() => StoreEntity)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'int',
  })
  rating: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
