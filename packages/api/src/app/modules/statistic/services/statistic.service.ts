import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  OrderRepository,
  RoleRepository,
  StoreRepository,
  TransactionRepository,
  UserRepository,
} from '../../../database';

@Injectable()
export class StatisticService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly storeRepository: StoreRepository,
    private readonly orderRepository: OrderRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly transactionRepository: TransactionRepository
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
}
