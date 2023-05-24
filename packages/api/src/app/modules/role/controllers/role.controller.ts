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
import { RoleService } from '../services';

const c = nestControllerContract(contract.role);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class RoleController implements NestControllerInterface<typeof c> {
  constructor(private readonly service: RoleService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.RoleCreate)
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const role = await this.service.create(body);

    return { status: 201 as const, body: role };
  }

  @Permissions(RolePermission.RoleGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const role = await this.service.getById(params.id);

    if (!role) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: role };
  }

  @Permissions(RolePermission.RoleGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.service.getAll(query);

    return { status: 200 as const, body: users };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.RoleUpdate)
  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedRole = await this.service.update(params.id, body);

    return { status: 201 as const, body: updatedRole };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.RoleDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.service.delete(params.id);

    return { status: 204 as const, body: '' };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.RoleUpdate)
  @TsRest(c.updatePermissions)
  async updatePermissions(
    @TsRestRequest() { params, body }: RequestShapes['updatePermissions']
  ) {
    const updatedRole = await this.service.updatePermissions(params.id, body.ids);

    return { status: 204 as const, body: updatedRole };
  }
}
