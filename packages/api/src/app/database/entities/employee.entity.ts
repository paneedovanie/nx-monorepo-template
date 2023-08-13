import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { StoreEntity } from './store.entity';
import { UserEntity } from './user.entity';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.jobs)
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.employees)
  store: StoreEntity;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: 'employee_roles' })
  roles: RoleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
