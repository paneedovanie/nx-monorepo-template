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
import { OrderService } from '../services';

const c = nestControllerContract(contract.order);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class OrderController implements NestControllerInterface<typeof c> {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.OrderCreate)
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const order = await this.orderService.create(body);

    return { status: 201 as const, body: order };
  }

  @Permissions(RolePermission.OrderGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const order = await this.orderService.getById(params.id);

    if (!order) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: order };
  }

  @Permissions(RolePermission.OrderGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.orderService.getAll(query);

    return { status: 200 as const, body: users };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.OrderUpdate)
  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedUser = await this.orderService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.OrderDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.orderService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
