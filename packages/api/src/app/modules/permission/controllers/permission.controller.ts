import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards } from '@nestjs/common';
import { contract } from '@nx-monorepo-template/global';
import { JwtAuthGuard } from '../../auth/guards';
import { PermissionService } from '../services';

const c = nestControllerContract(contract.permission);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard)
@Controller()
export class PermissionController implements NestControllerInterface<typeof c> {
  constructor(private readonly service: PermissionService) {}

  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const role = await this.service.getById(params.id);

    if (!role) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: role };
  }

  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.service.getAll(query);

    return { status: 200 as const, body: users };
  }
}
