import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
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
}
