import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';
import { PaymentEntity } from './payment.entity';
import { OrderProduct } from '@nx-monorepo-template/global';

enum OrderStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  PREPARING = 'preparing',
  READY = 'ready',
  COMPLETED = 'completed',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  ref: number;

  @ManyToOne(() => StoreEntity)
  store: StoreEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: 'jsonb',
    transformer: {
      to: (v) =>
        v.map((item) => ({
          ...item,
          price: item.price / 100,
        })),
      from: (v) =>
        v.map((item) => ({
          ...item,
          price: item.price * 100,
        })),
    },
  })
  items: OrderProduct[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @OneToOne(() => PaymentEntity, (payment) => payment.order, { nullable: true })
  @JoinColumn()
  payment: PaymentEntity;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
