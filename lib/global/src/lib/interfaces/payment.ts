import { z } from 'zod';
import {
  CreatePaymentSchema,
  GetPaymentsResponseSchema,
  UpdatePaymentSchema,
  PaymentSchema,
  GetPaymentsOptionsSchema,
} from '../schemas';

export enum PaymentType {
  Cash = 'cash',
  Online = 'online',
}

export type Payment = z.infer<typeof PaymentSchema>;

export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

export type UpdatePayment = z.infer<typeof UpdatePaymentSchema>;

export type GetPaymentsResponse = z.infer<typeof GetPaymentsResponseSchema>;

export type GetPaymentsOptions = z.infer<typeof GetPaymentsOptionsSchema>;
