import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('categories')
@Index(['parent', 'title', 'type'], { unique: true })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children)
  parent?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children?: CategoryEntity[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
