import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTransaction,
  NotificationType,
  OrderProduct,
  Pay,
  PaymentType,
} from '@nx-monorepo-template/global';
import {
  NotificationRepository,
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
    private readonly paymentRepository: PaymentRepository,
    private readonly notificationRepository: NotificationRepository
  ) {
    super(repository);
  }

  async balance(userId: string) {
    const balance = await this.repository.balance(userId);

    return { balance };
  }

  async generate(input: CreateTransaction) {
    const receiverData = await this.userRepository.findOneBy({
      uniqueCode: input.receiver,
    });
    if (!receiverData) throw new BadRequestException("The user doesn't exists");

    const transaction = this.repository.create({
      receiver: { id: receiverData.id },
      amount: input.amount,
    });

    const createdTransaction = await this.repository.save(transaction);

    await this.notificationRepository.createWithRelations({
      type: NotificationType.AmountReceived,
      user: receiverData.id,
      metadata: {
        amount: input.amount,
      },
    });

    return createdTransaction;
  }

  async transfer(input: CreateTransaction, sender: string) {
    const receiverData = await this.userRepository.findOneBy({
      uniqueCode: input.receiver,
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
      receiver: { id: receiverData.id },
      sender: { id: sender },
      amount: input.amount,
    });

    const createdTransaction = await this.repository.save(transaction);

    await this.notificationRepository.createWithRelations({
      type: NotificationType.AmountReceived,
      user: receiverData.id,
      metadata: {
        amount: input.amount,
        userId: sender,
      },
    });

    await this.notificationRepository.createWithRelations({
      type: NotificationType.AmountSent,
      user: sender,
      metadata: {
        amount: input.amount,
        userId: receiverData.id,
      },
    });

    return createdTransaction;
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
      type: PaymentType.Online,
    });
    await this.paymentRepository.save(payment);

    await this.notificationRepository.createWithRelations({
      type: NotificationType.AmountReceived,
      user: transaction.receiver.id,
      metadata: {
        orderId: orderData.id,
        storeId: orderData.store.id,
        amount: totalCost,
        userId: sender,
      },
    });

    await this.notificationRepository.createWithRelations({
      type: NotificationType.AmountSent,
      user: sender,
      metadata: {
        orderId: orderData.id,
        amount: totalCost,
        userId: transaction.receiver.id,
      },
    });

    return createdTransaction;
  }
}
