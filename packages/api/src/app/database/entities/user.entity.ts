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
  BeforeInsert,
} from 'typeorm';
import { CredentialEntity } from './credential.entity';
import { RoleEntity } from './role.entity';
import { TransactionEntity } from './transaction.entity';
import { StoreEntity } from './store.entity';
import { EmployeeEntity } from './employee.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  uniqueCode: string;

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

  @OneToMany(() => EmployeeEntity, (employee) => employee.user)
  jobs: EmployeeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async generateRandomString() {
    const timestamp = new Date().getTime().toString();
    const characters = 'T5NYVA3ISZU7M';
    let uniqueCode = '';

    for (let i = 0; i < timestamp.length; i++) {
      const digit = parseInt(timestamp[i]);
      uniqueCode += characters.charAt(digit);
    }

    this.uniqueCode = uniqueCode;
  }
}
