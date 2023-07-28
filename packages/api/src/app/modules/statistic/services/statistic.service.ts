import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  OrderRepository,
  ProductRepository,
  RoleRepository,
  StoreRepository,
  TransactionRepository,
  UserRepository,
} from '../../../database';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class StatisticService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly storeRepository: StoreRepository,
    private readonly orderRepository: OrderRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async getStoresCount(userId?: string): Promise<number> {
    const options = userId
      ? {
          where: { owner: { id: userId } },
        }
      : undefined;

    return this.storeRepository.count(options);
  }

  async getOrdersCount(userId?: string): Promise<number> {
    const options = userId
      ? {
          where: { user: { id: userId } },
        }
      : undefined;

    return this.orderRepository.count(options);
  }

  async getStoresOrdersCount(userId: string): Promise<number> {
    return this.orderRepository.count({
      where: { store: { owner: { id: userId } } },
    });
  }

  async getStoreOrdersCount(storeId: string): Promise<number> {
    return this.orderRepository.count({
      where: { store: { id: storeId } },
    });
  }

  async getStorePaymentsCount(storeId: string): Promise<number> {
    return this.orderRepository.count({
      where: {
        store: { id: storeId },
        payment: {
          id: Not(IsNull()),
        },
      },
    });
  }

  async getStoreCategoriesCount(storeId: string): Promise<number> {
    return this.categoryRepository.count({
      where: {
        store: { id: storeId },
      },
    });
  }

  async getStoreProductsCount(storeId: string): Promise<number> {
    return this.productRepository.count({
      where: {
        store: { id: storeId },
      },
    });
  }

  async getUsersCount(): Promise<number> {
    return this.userRepository.count();
  }

  async getRolesCount(): Promise<number> {
    return this.roleRepository.count();
  }

  async getCategoriesCount(): Promise<number> {
    return this.categoryRepository.count();
  }

  async getCirculatingAmount(): Promise<number> {
    return this.transactionRepository.systemCirculatingAmount();
  }

  async getStoreDashboard(storeId: string) {
    return {
      storeId,
      categoriesCount: await this.getStoreCategoriesCount(storeId),
      productsCount: await this.getStoreProductsCount(storeId),
      ordersCount: await this.getStoreOrdersCount(storeId),
      paymentsCount: await this.getStorePaymentsCount(storeId),
    };
  }

  async getStoreOrdersCountPerDay(storeId: string, from: Date, to: Date) {
    return this.orderRepository.query(
      `
        SELECT all_dates.date AS date,
        COUNT(orders.created_at) AS count
        FROM (
          SELECT generate_series(
            $2::date,
            $3::date,
            INTERVAL '1 day'
          ) AS date
        ) all_dates
        LEFT JOIN orders
        ON DATE_TRUNC('day', orders.created_at) = all_dates.date AND orders.store_id = $1
        GROUP BY all_dates.date
        ORDER BY all_dates.date;
      `,
      [storeId, from, to]
    );
  }
}
