import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity('stores')
@Index(['title', 'owner'], { unique: true })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  owner?: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity;

  @Column()
  title: string;

  @Column({
    nullable: true,
    transformer: {
      to: (v) => v,
      from: (v) => {
        const protocol = process.env.PROTOCOL ?? 'http';
        const host = process.env.HOST ?? 'localhost';
        const port = process.env.PORT ?? '3000';
        return v && `${protocol}://${host}:${port}/files/${v}`;
      },
    },
  })
  image: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  get imageUrl(): string {
    const protocol = process.env.PROTOCOL ?? 'http';
    const host = process.env.HOST ?? 'host';
    const port = process.env.PORT ?? 'port';
    return this.image && `${protocol}://${host}:${port}/${this.image}`;
  }
}
