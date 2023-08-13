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
import { EmployeeService } from '../services';
import { UserService } from '../../user';

const c = nestControllerContract(contract.employee);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class EmployeeController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly service: EmployeeService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.EmployeeCreate)
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const user = await this.userService.getByUniqueCode(body.uniqueCode);
    const employee = await this.service.create({
      user: user.id,
      store: body.store,
      roles: [body.role],
    });

    return { status: 201 as const, body: employee };
  }

  @Permissions(RolePermission.EmployeeGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const employee = await this.service.getById(params.id);

    if (!employee) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: employee };
  }

  @Permissions(RolePermission.EmployeeGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.service.getAll(query);

    return { status: 200 as const, body: users };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.EmployeeUpdate)
  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedEmployee = await this.service.update(params.id, body);

    return { status: 201 as const, body: updatedEmployee };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.EmployeeDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.service.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
