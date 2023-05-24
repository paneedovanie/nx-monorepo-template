import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards } from '@nestjs/common';
import { contract, RolePermission } from '@nx-monorepo-template/global';
import { JwtAuthGuard, PermissionGuard } from '../../auth/guards';
import { Permissions } from '../../auth';
import { PaymentService } from '../services';

const c = nestControllerContract(contract.payment);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class PaymentController implements NestControllerInterface<typeof c> {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.PaymentCreate)
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
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
}
