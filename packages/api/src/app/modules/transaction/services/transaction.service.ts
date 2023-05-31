import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTransaction,
  OrderProduct,
  Pay,
} from '@nx-monorepo-template/global';
import {
  OrderRepository,
  PaymentRepository,
  TransactionEntity,
  TransactionRepository,
  UserRepository,
} from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class TransactionService extends BaseService<TransactionEntity> {
  constructor(
    protected readonly repository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository
  ) {
    super(repository);
  }

  async balance(userId: string) {
    const result = await this.repository
      .createQueryBuilder()
      .select(
        `SUM(
            amount *
            (
                CASE
                    WHEN receiver = :userId
                    THEN 1
                    ELSE -1
                END
            )
          )`,
        'balance'
      )
      .where(
        `(receiver != sender OR receiver IS NULL OR sender IS NULL) AND (receiver = :userId OR sender = :userId)`
      )
      .setParameters({ userId })
      .getRawOne();

    return { balance: +(result?.balance ?? 0) / 100 };
  }

  async generate(input: CreateTransaction) {
    const receiverData = await this.userRepository.findOneBy({
      id: input.receiver,
    });
    if (!receiverData) throw new BadRequestException("The user doesn't exists");

    const transaction = this.repository.create({
      receiver: { id: input.receiver },
      amount: input.amount,
    });

    return this.repository.save(transaction);
  }

  async transfer(input: CreateTransaction, sender: string) {
    const receiverData = await this.userRepository.findOneBy({
      id: input.receiver,
    });
    if (!receiverData) throw new BadRequestException("The user doesn't exists");

    const result = await this.balance(sender);

    if (input.amount > +(result?.balance ?? 0)) {
      throw new BadRequestException('Balance is not enough');
    }

    if (input.receiver === sender) {
      throw new BadRequestException("Can't send amount to yourself");
    }

    const transaction = this.repository.create({
      receiver: { id: input.receiver },
      sender: { id: sender },
      amount: input.amount,
    });

    return this.repository.save(transaction);
  }

  async pay(input: Pay, sender: string) {
    const orderData = await this.orderRepository.findOne({
      where: {
        id: input.orderId,
      },
      relations: ['store', 'store.owner'],
    });
    if (!orderData) throw new BadRequestException("The order doesn't exists");

    const result = await this.balance(sender);

    const reducer = (curr, item: OrderProduct) => {
      return curr + item.price * item.count;
    };

    const totalCost = orderData.items.reduce(reducer, 0);

    if (totalCost > +(result?.balance ?? 0)) {
      throw new BadRequestException('Balance is not enough');
    }

    const transaction = this.repository.create({
      receiver: { id: orderData.store.owner.id },
      sender: { id: sender },
      amount: totalCost,
    });
    const createdTransaction = await this.repository.save(transaction);

    const payment = this.paymentRepository.create({
      order: { id: orderData.id },
      amountPaid: totalCost,
      totalCost,
      change: 0,
    });
    await this.paymentRepository.save(payment);

    return createdTransaction;
  }
}
