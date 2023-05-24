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
  CASH = 'cash',
  ONLINE = 'online',
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
    default: PaymentType.CASH,
  })
  type: PaymentType;

  @Column({
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  amountPaid: number;

  @Column({
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  totalCost: number;

  @Column()
  change: number;

  @BeforeInsert()
  @BeforeUpdate()
  calcChange(): void {
    this.change = this.amountPaid - this.totalCost;
  }

  @CreateDateColumn()
  createdAt: Date;
}
