import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'sender' })
  sender?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({ name: 'receiver' })
  receiver?: UserEntity;

  @Column({
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
