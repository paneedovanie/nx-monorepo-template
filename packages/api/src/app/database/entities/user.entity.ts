import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CredentialEntity } from './credential.entity';
import { RoleEntity } from './role.entity';
import { TransactionEntity } from './transaction.entity';
import { StoreEntity } from './store.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => CredentialEntity, (credential) => credential.user)
  credential: CredentialEntity;

  @OneToMany(
    () => TransactionEntity,
    (transaction) => transaction.sender ?? transaction.receiver
  )
  transactions: TransactionEntity[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @OneToMany(() => StoreEntity, (store) => store.owner)
  stores: StoreEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
