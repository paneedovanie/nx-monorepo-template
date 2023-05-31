import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  ProductEntity,
  ProductRepository,
  StoreRepository,
} from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(protected readonly repository: ProductRepository) {
    super(repository);
  }
}
