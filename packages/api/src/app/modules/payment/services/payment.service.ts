import { Injectable } from '@nestjs/common';
import { PaymentEntity, PaymentRepository } from '../../../database';
import { BaseService } from '../../../core';

@Injectable()
export class PaymentService extends BaseService<PaymentEntity> {
  constructor(protected readonly repository: PaymentRepository) {
    super(repository);
  }
}
