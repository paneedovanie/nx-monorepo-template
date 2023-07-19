import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  Controller,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  checkUserPermission,
  contract,
  RolePermission,
} from '@nx-monorepo-template/global';
import { UserService } from '../services';
import { JwtAuthGuard, PermissionGuard } from '../../auth/guards';
import { Permissions } from '../../auth';

const c = nestControllerContract(contract.user);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class UserController implements NestControllerInterface<typeof c> {
  constructor(private readonly userService: UserService) {}

  @Permissions(RolePermission.UserCreate)
  @TsRest(c.createUser)
  async createUser(@TsRestRequest() { body }: RequestShapes['createUser']) {
    const post = await this.userService.create(body);

    return { status: 201 as const, body: post };
  }

  @Permissions(RolePermission.UserGet)
  @TsRest(c.getUser)
  async getUser(@TsRestRequest() { params }: RequestShapes['getUser']) {
    const post = await this.userService.getById(params.id);

    if (!post) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: post };
  }

  @Permissions(RolePermission.UserGetAll)
  @TsRest(c.getUsers)
  async getUsers(@TsRestRequest() { query }: RequestShapes['getUsers']) {
    const users = await this.userService.getAll(query);

    return { status: 200 as const, body: users };
  }

  @Permissions(RolePermission.UserUpdate, RolePermission.UserUpdateUnrestricted)
  @TsRest(c.updateUser)
  async updateUser(
    @Request() { user },
    @TsRestRequest() { params, body }: RequestShapes['updateUser']
  ) {
    if (
      user.id !== params.id &&
      !checkUserPermission(user, [RolePermission.UserUpdateUnrestricted])
    ) {
      throw new ForbiddenException();
    }

    const updatedUser = await this.userService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.UserUpdate, RolePermission.UserUpdateUnrestricted)
  @TsRest(c.assignRole)
  async assignRole(
    @TsRestRequest() { params, body }: RequestShapes['assignRole']
  ) {
    const updatedUser = await this.userService.assignRole(
      params.id,
      body.roleId
    );

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.UserUpdate, RolePermission.UserUpdateUnrestricted)
  @TsRest(c.unassignRole)
  async unassignRole(
    @TsRestRequest() { params, body }: RequestShapes['unassignRole']
  ) {
    const updatedUser = await this.userService.unassignRole(
      params.id,
      body.roleId
    );

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.UserUpdate)
  @TsRest(c.assignAsStoreOwner)
  async assignAsStoreOwner(
    @TsRestRequest() { params }: RequestShapes['assignAsStoreOwner']
  ) {
    const updatedUser = await this.userService.assignAsStoreOwner(params.id);

    return { status: 201 as const, body: updatedUser };
  }
}
