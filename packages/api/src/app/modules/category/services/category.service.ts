import { Injectable } from '@nestjs/common';
import { CategoryEntity, CategoryRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }
}
