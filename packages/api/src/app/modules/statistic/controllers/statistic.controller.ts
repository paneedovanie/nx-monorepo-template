import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, Request, UseGuards } from '@nestjs/common';
import {
  checkUserPermission,
  contract,
  Dashboard,
  RolePermission,
  TokenUser,
} from '@nx-monorepo-template/global';
import { JwtAuthGuard } from '../../auth/guards';
import { StatisticService } from '../services';

const c = nestControllerContract(contract.statistic);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard)
@Controller()
export class StatisticController implements NestControllerInterface<typeof c> {
  constructor(private readonly service: StatisticService) {}

  @TsRest(c.dashboard)
  async dashboard(
    @TsRestRequest() { query }: RequestShapes['dashboard'],
    @Request() { user }: { user: TokenUser }
  ) {
    const { unrestricted } = query;
    const body: Dashboard = {};

    body.myStoresCount = await this.service.getStoresCount(user.id);
    body.myOrdersCount = await this.service.getOrdersCount(user.id);
    body.myStoresOrdersCount = await this.service.getStoresOrdersCount(user.id);

    if (unrestricted) {
      if (checkUserPermission(user, [RolePermission.UserGetAll])) {
        body.usersCount = await this.service.getOrdersCount();
      }
      if (checkUserPermission(user, [RolePermission.RoleGetAll])) {
        body.rolesCount = await this.service.getRolesCount();
      }
      if (checkUserPermission(user, [RolePermission.CategoryGetAll])) {
        body.categoriesCount = await this.service.getCategoriesCount();
      }

      body.storesCount = await this.service.getStoresCount();
      body.ordersCount = await this.service.getOrdersCount();
      body.circulatingAmount = await this.service.getCirculatingAmount();
    }

    return { status: 200 as const, body };
  }
}
