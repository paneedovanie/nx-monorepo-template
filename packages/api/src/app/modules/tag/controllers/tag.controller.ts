import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards } from '@nestjs/common';
import { contract } from '@nx-monorepo-template/global';
import {
  AllowUnauthorize,
  JwtAuthGuard,
  PermissionGuard,
} from '../../auth/guards';
import { TagService } from '../services';

const c = nestControllerContract(contract.tag);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class TagController implements NestControllerInterface<typeof c> {
  constructor(private readonly tagService: TagService) {}

  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const tag = await this.tagService.create(body);

    return { status: 201 as const, body: tag };
  }

  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const tag = await this.tagService.getById(params.id);

    if (!tag) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: tag };
  }

  @AllowUnauthorize()
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const categories = await this.tagService.getAll(query);

    return { status: 200 as const, body: categories };
  }

  @TsRest(c.update)
  async update(@TsRestRequest() { params, body }: RequestShapes['update']) {
    const updatedUser = await this.tagService.update(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }

  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.tagService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
