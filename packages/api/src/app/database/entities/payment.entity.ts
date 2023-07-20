import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { OrderEntity } from './order.entity';

enum PaymentType {
  Cash = 'cash',
  Online = 'online',
}

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => OrderEntity, (order) => order.payment)
  order: OrderEntity;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.Cash,
  })
  type: PaymentType;

  @Column({
    type: 'bigint',
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  amountPaid: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  totalCost: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  change: number;

  @BeforeInsert()
  @BeforeUpdate()
  calcChange(): void {
    this.change = this.amountPaid - this.totalCost;
  }

  @CreateDateColumn()
  createdAt: Date;
}
