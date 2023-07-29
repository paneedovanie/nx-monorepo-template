import { Injectable } from '@nestjs/common';
import {
  Between,
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { CategoryEntity, ProductEntity } from '../entities';
import { BaseRepository } from '../../core';
import { StoreRepository } from './store.repository';
import { CategoryRepository } from './category.repository';
import { CreateProduct, UpdateProduct } from '@nx-monorepo-template/global';
import { OrderRepository } from './order.repository';

@Injectable()
export class ProductRepository extends BaseRepository<
  ProductEntity,
  CreateProduct,
  UpdateProduct
> {
  constructor(
    dataSource: DataSource,
    private readonly storeRepository: StoreRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly orderRepository: OrderRepository
  ) {
    super(ProductEntity, dataSource);
  }

  protected async modifyResult(
    item: ProductEntity
  ): Promise<
    ProductEntity & { categories: CategoryEntity[]; isBestSeller: boolean }
  > {
    if (!item) {
      return null;
    }

    const bestSeller = (
      await this.orderRepository.query(
        `
        SELECT i->>'id' as id, SUM((i->>'count')::numeric) as count
        FROM public.orders o
        CROSS JOIN LATERAL jsonb_array_elements(o.items) as i
        WHERE o.store_id = $1 AND i->>'id' IS NOT NULL
        GROUP BY i->>'id'
        ORDER BY count DESC
      `,
        [item.store.id]
      )
    )?.[0];

    return {
      ...item,
      categories: await this.categoryRepository.getParentsByCategoryId(
        item.category.id
      ),
      isBestSeller: item.id === bestSeller?.id,
    };
  }

  protected searchFields(): string[] {
    return ['title'];
  }

  protected mapRelations(): Record<string, BaseRepository<unknown>> {
    return {
      store: this.storeRepository,
      category: this.categoryRepository,
    };
  }

  protected relations(): FindOptionsRelations<ProductEntity> {
    return {
      store: true,
      category: true,
    };
  }

  protected modifyWhere({
    ids,
    categoryIds,
    minPrice,
    maxPrice,
    ...conditions
  }: FindOptionsWhere<ProductEntity> & {
    ids?: string[];
    categoryIds?: string[];
    minPrice?: number;
    maxPrice?: number;
  }): FindOptionsWhere<ProductEntity> {
    if (ids) conditions.id = In(ids);
    if (categoryIds) {
      conditions.category = [
        { id: In(categoryIds) },
        { parent: In(categoryIds) },
      ];
    }
    if (minPrice && maxPrice) {
      conditions.price = Between(minPrice, maxPrice);
    } else if (minPrice) {
      conditions.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice) {
      conditions.price = LessThanOrEqual(maxPrice);
    }
    return conditions;
  }
}
