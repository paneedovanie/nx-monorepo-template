import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { INotificationMetadata } from '@nx-monorepo-template/global';

export enum NotificationType {
  StoreOrderCreated = 'store-order-created',
  StoreOrderUpdated = 'store-order-updated',
  StoreOrderDeleted = 'store-order-deleted',
  OrderCreated = 'order-created',
  OrderUpdated = 'order-updated',
  OrderDeleted = 'order-deleted',
  AccountCreated = 'account-created',
  AccountUpdated = 'account-updated',
  AmountSent = 'amount-sent',
  AmountReceived = 'amount-received',
}

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ default: false })
  opened: boolean;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({
    type: 'jsonb',
  })
  metadata: INotificationMetadata;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
