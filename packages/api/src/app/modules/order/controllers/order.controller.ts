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
  UseGuards,
} from '@nestjs/common';
import {
  checkUserPermission,
  contract,
  RolePermission,
} from '@nx-monorepo-template/global';
import {
  AllowUnauthorize,
  JwtAuthGuard,
  PermissionGuard,
} from '../../auth/guards';
import { Permissions } from '../../auth';
import { OrderService } from '../services';
import { StoreService } from '../../store/services';

const c = nestControllerContract(contract.order);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class OrderController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly orderService: OrderService,
    private readonly storeService: StoreService
  ) {}

  @AllowUnauthorize()
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const store = await this.storeService.getById(body.store);
    const order = await this.orderService.create({
      ...body,
      tax: store?.config?.tax ?? 0,
    });

    return { status: 201 as const, body: order };
  }

  @AllowUnauthorize()
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const order = await this.orderService.getById(params.id);

    if (!order) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: order };
  }

  @Permissions(
    RolePermission.OrderGetAll,
    RolePermission.OrderGetAllUnrestricted
  )
  @TsRest(c.getAll)
  async getAll(
    @TsRestRequest() { query }: RequestShapes['getAll'],
    @Request() { user }
  ) {
    const { unrestricted, ...rest } = query;
    if (!unrestricted && rest.storeIds) {
      const stores = await this.storeService.getManyByIds(rest.storeIds);
      const storeIds = stores.reduce((curr, item) => {
        return item.owner.id === user.id ? [...curr, item.id] : curr;
      }, []);
      rest.storeIds = storeIds;
    } else if (!unrestricted && user) {
      rest.userIds = [user.id];
    } else if (
      !checkUserPermission(user, [RolePermission.OrderGetAllUnrestricted])
    ) {
      throw new ForbiddenException();
    }
    const users = await this.orderService.getAll(rest);

    return { status: 200 as const, body: users };
  }

  @Permissions(RolePermission.OrderUpdate)
  @TsRest(c.update)
  async update(
    @TsRestRequest() { query, params, body }: RequestShapes['update'],
    @Request() { user }
  ) {
    const { unrestricted } = query;
    const order = await this.orderService.getById(params.id);

    if (
      !unrestricted &&
      order.store.owner.id !== user.id &&
      !checkUserPermission(user, [RolePermission.OrderUpdateUnrestricted])
    ) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.orderService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.OrderDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.orderService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
