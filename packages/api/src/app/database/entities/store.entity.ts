import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { TagEntity } from './tag.entity';
import { CategoryEntity } from './category.entity';
import { StoreConfig } from '@nx-monorepo-template/global';
import { EmployeeEntity } from './employee.entity';

@Entity('stores')
@Index(['title', 'owner'], { unique: true })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  owner?: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.store)
  employees: EmployeeEntity[];

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => TagEntity, (tag) => tag.stores)
  @JoinTable({ name: 'store_tags' })
  tags: TagEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.store)
  @JoinTable({ name: 'store_categories' })
  categories: CategoryEntity[];

  @Column({ type: 'jsonb', nullable: true })
  config?: StoreConfig;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ select: false, insert: false, readonly: true, nullable: true })
  rating: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
