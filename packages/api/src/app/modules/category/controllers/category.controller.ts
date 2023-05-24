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
import { CategoryService } from '../services';

const c = nestControllerContract(contract.category);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class CategoryController implements NestControllerInterface<typeof c> {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.CategoryCreate)
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const category = await this.categoryService.create(body);

    return { status: 201 as const, body: category };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.CategoryGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const category = await this.categoryService.getById(params.id);

    if (!category) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: category };
  }

  // @Permissions(RolePermission.CategoryGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const categories = await this.categoryService.getAll(query);

    return { status: 200 as const, body: categories };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.CategoryUpdate)
  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedUser = await this.categoryService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.CategoryDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.categoryService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
