import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @CreateDateColumn()
  createdAt: Date;
}
