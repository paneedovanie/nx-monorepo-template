import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { StoreEntity } from './store.entity';

@Entity('products')
@Index(['title', 'store'], { unique: true })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToOne(() => StoreEntity, (store) => store.products)
  store: StoreEntity;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    transformer: {
      to: (v) => v * 100,
      from: (v) => v / 100,
    },
  })
  price: number;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
