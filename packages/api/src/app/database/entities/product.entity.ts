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

  @Column({
    nullable: true,
    transformer: {
      to: (v) => v,
      from: (v) => {
        const protocol = process.env.PROTOCOL ?? 'http';
        const host = process.env.HOST ?? 'localhost';
        const port = process.env.PORT ?? '3000';
        return v && `${protocol}://${host}:${port}/${v}`;
      },
    },
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
