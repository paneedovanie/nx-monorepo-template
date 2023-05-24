import { Injectable } from '@nestjs/common';
import { CategoryEntity, CategoryRepository } from '../../../database';
import { BaseService } from '../../../core';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { FindOptionsRelations, FindOptionsWhere, IsNull, Not } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }

  protected mapRelations(): Record<string, BaseRepository<any>> {
    return { parent: this.repository };
  }

  protected relations(): FindOptionsRelations<CategoryEntity> {
    return { parent: true, children: true };
  }

  protected where({
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
