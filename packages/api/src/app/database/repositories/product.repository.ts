import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource);
  }

  protected searchFields(): string[] {
    return ['title'];
  }
}
