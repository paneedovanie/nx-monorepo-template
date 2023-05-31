import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Not,
} from 'typeorm';
import { CategoryEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(CategoryEntity, dataSource);
  }

  searchFields(): string[] {
    return ['title'];
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return { parent: this };
  }

  protected relations(): FindOptionsRelations<CategoryEntity> {
    return { parent: true, children: true };
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
