import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';
import { StoreEntity } from './store.entity';

@Entity('tags')
@Index(['title', 'type'], { unique: true })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @ManyToMany(() => StoreEntity, (store) => store.tags)
  stores: StoreEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
