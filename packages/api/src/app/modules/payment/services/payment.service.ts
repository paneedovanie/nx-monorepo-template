import { Injectable } from '@nestjs/common';
import {
  OrderRepository,
  PaymentEntity,
  PaymentRepository,
} from '../../../database';
import { BaseService } from '../../../core';
import htmlPdfNode from 'html-pdf-node';
import {
  CreateMayaCheckout,
  CreatePayment,
  MayaCheckout,
  Order,
  OrderProduct,
  PaymentType,
  UpdatePayment,
  formatCurrency,
} from '@nx-monorepo-template/global';
import api from 'api';
import { ConfigService } from '@nestjs/config';
const sdk = api('@paymaya/v5.16#1bmd73pl9p4h9zf');

sdk.auth('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah');

@Injectable()
export class PaymentService extends BaseService<
  PaymentEntity,
  CreatePayment,
  UpdatePayment
> {
  constructor(
    protected readonly repository: PaymentRepository,
    protected readonly orderRepository: OrderRepository,
    protected readonly configService: ConfigService
  ) {
    super(repository);
  }

  private listItems(order: Order) {
    return order.items.map((item) => {
      return `<tr>
          <td style="text-align: left">${item.count} ${item.title}</td>
          <td style="text-align: center">${item.count}</td>
          <td style="text-align: right">${formatCurrency(
            item.price * item.count
          )}</td>
        </tr>`;
    });
  }

  async generateReceipt(paymentId: string): Promise<string> {
    const payment = await this.getById(paymentId);

    let totalCost = 0;
    payment.order.items.forEach(({ price, count }: OrderProduct) => {
      const totalPrice = price * count;
      totalCost += totalPrice;
    });
    const taxPercentage = (payment.order.tax ?? 0) / 100;

    const tax = totalCost * taxPercentage;

    const subTotal = totalCost - tax;

    const options = { width: 200 };
    const file = {
      content: `<center style="margin-bottom: 10px">
        <h4>${payment.order.store.title}</h4>
      </center>
      <h6>Order Ref: ${payment.order.ref}</h6>
      <hr />
      <table style="font-size: 8px; width: 100%">
      <thead>
        <tr>
          <th style="text-align: left">Item</th>
          <th>Qty</th>
          <th style="text-align: right">Cost</th>
        </tr>
      </thead>
      <tbody>
        ${this.listItems(payment.order)}
      </tbody>
      </table>
      <hr />
      <table style="font-size: 8px; width: 100%">
      <tbody>
        <tr>
          <td style="width: 50px"></td><td>SUB-TOTAL</td><td style="text-align: right">${formatCurrency(
            subTotal
          )}</td>
        </tr>
        <tr>
          <td></td><td>TAX</td><td style="text-align: right">${formatCurrency(
            tax
          )}</td>
        </tr>
        <tr>
          <td></td><td>COST TENDERED</td><td style="text-align: right">${formatCurrency(
            totalCost
          )}</td>
        </tr>
      </tbody>
      </table>
      `,
    };
    const buffer = await htmlPdfNode.generatePdf(file, options);
    return buffer.toString('base64');
  }

  async createPaymentLink(orderId: string): Promise<MayaCheckout> {
    const baseUrl = this.configService.get('baseUrl');
    const order = await this.orderRepository.getByIdWithRelations(orderId);

    const getTotalCost = () => {
      let total = 0;
      order?.items.forEach(({ price, count }: OrderProduct) => {
        const totalPrice = price * count;
        total += totalPrice;
      });
      return total;
    };
    const totalCost = getTotalCost();
    const taxPercentage = (order.tax ?? 0) / 100;

    const tax = totalCost * taxPercentage;

    const subTotal = totalCost - tax;

    return this.generateMayaPayment({
      totalAmount: {
        value: totalCost,
        currency: 'PHP',
      },
      items: order.items.map((item) => ({
        name: item.title,
        quantity: item.count,
        amount: { value: item.price },
        totalAmount: {
          value: item.count * item.price,
        },
      })),
      requestReferenceNumber: orderId,
      redirectUrl: {
        success:
          baseUrl + '/api/v1/payments/success-payment-redirect/' + orderId,
      },
    });
  }

  async generateMayaPayment(input: CreateMayaCheckout): Promise<MayaCheckout> {
    const result = await sdk.createV1Checkout(input);
    return result.data;
  }

  async successPayment(orderId: string) {
    const order = await this.orderRepository.getByIdWithRelations(orderId);

    const getTotalCost = () => {
      let total = 0;
      order?.items.forEach(({ price, count }: OrderProduct) => {
        const totalPrice = price * count;
        total += totalPrice;
      });
      return total;
    };
    const totalCost = getTotalCost();

    await this.repository.createWithRelations({
      type: PaymentType.Online,
      totalCost,
      amountPaid: totalCost,
      order: orderId,
    });
  }
}
