import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  Controller,
  ForbiddenException,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { contract, RolePermission } from '@nx-monorepo-template/global';
import { JwtAuthGuard, PermissionGuard } from '../../auth/guards';
import { Permissions } from '../../auth';
import { PaymentService } from '../services';
import { OrderService } from '../../order';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

const c = nestControllerContract(contract.payment);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class PaymentController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.PaymentCreate)
  @TsRest(c.create)
  async create(
    @TsRestRequest() { body }: RequestShapes['create'],
    @Request() { user }
  ) {
    const order = await this.orderService.getById(body.order);
    if (order.user !== user.id && order.store.owner.id !== user.id) {
      throw new ForbiddenException();
    }

    const payment = await this.paymentService.create(body);

    return { status: 201 as const, body: payment };
  }

  @Permissions(RolePermission.PaymentGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const payment = await this.paymentService.getById(params.id);

    if (!payment) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: payment };
  }

  @Permissions(RolePermission.PaymentGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.paymentService.getAll(query);

    return { status: 200 as const, body: users };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.PaymentUpdate)
  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedUser = await this.paymentService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.PaymentDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.paymentService.delete(params.id);

    return { status: 204 as const, body: '' };
  }

  @Permissions(RolePermission.PaymentGet)
  @TsRest(c.receipt)
  async receipt(@TsRestRequest() { params }: RequestShapes['receipt']) {
    const receipt = await this.paymentService.generateReceipt(params.id);

    if (!receipt) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: { file: receipt } };
  }

  @TsRest(c.createPaymentLink)
  async createPaymentLink(
    @TsRestRequest() { body }: RequestShapes['createPaymentLink']
  ) {
    const result = await this.paymentService.createPaymentLink(body.orderId);

    if (!result) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: result };
  }

  @TsRest(c.successPaymentRedirect)
  async successPaymentRedirect(
    @TsRestRequest() { params }: RequestShapes['successPaymentRedirect'],
    @Res() res: Response
  ) {
    const frontEndUrl = this.configService.get('frontEndUrl');
    await this.paymentService.successPayment(params.orderId);

    res.send(`
      <script>
        window.opener.postMessage('refresh-order', '${frontEndUrl}')
      </script>
    `);

    return { status: 200 as const, body: null };
  }
}
