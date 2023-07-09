import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Not,
} from 'typeorm';
import { CategoryEntity } from '../entities';
import { BaseRepository } from '../../core';
import { CreateCategory, UpdateCategory } from '@nx-monorepo-template/global';
import { StoreRepository } from './store.repository';

@Injectable()
export class CategoryRepository extends BaseRepository<
  CategoryEntity,
  CreateCategory,
  UpdateCategory
> {
  constructor(
    dataSource: DataSource,
    private readonly storeRepository: StoreRepository
  ) {
    super(CategoryEntity, dataSource);
  }

  getParentsByCategoryId(id: string): Promise<CategoryEntity[]> {
    return this.query(`
      WITH RECURSIVE category_tree AS (
        SELECT
          id,
          title,
          parent_id,
          description,
          type,
          created_at,
          1 AS level
        FROM
          categories
        WHERE
          id = '${id}'
      
        UNION ALL
      
        SELECT
          c.id,
          c.title,
          c.parent_id,
          c.description,
          c.type,
          c.created_at,
          ct.level + 1 AS level
        FROM
          categories c
        JOIN
          category_tree ct ON c.id = ct.parent_id
      )
      SELECT
        id,
        title,
        level
        description,
        type,
        created_at
      FROM
        category_tree
      ORDER BY
        level DESC, id;
    `);
  }

  searchFields(): string[] {
    return ['title'];
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
    return { parent: this, store: this.storeRepository };
  }

  protected relations(): FindOptionsRelations<CategoryEntity> {
    return { parent: true, children: true, store: true };
  }

  protected modifyWhere({
    isRoot,
    ...conditions
  }: FindOptionsWhere<CategoryEntity> & {
    isRoot: boolean;
  }): FindOptionsWhere<CategoryEntity> {
    if (isRoot !== undefined) {
      conditions.parent = isRoot ? IsNull() : Not(IsNull());
    }
    return conditions;
  }
}
