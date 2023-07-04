import { Injectable } from '@nestjs/common';
import { ProductEntity, ProductRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(protected readonly repository: ProductRepository) {
    super(repository);
  }
}
