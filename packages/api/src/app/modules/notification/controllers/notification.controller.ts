import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  Controller,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { contract } from '@nx-monorepo-template/global';
import { JwtAuthGuard } from '../../auth/guards';
import { NotificationService } from '../services';

const c = nestControllerContract(contract.notification);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard)
@Controller()
export class NotificationController
  implements NestControllerInterface<typeof c>
{
  constructor(private readonly service: NotificationService) {}

  @TsRest(c.count)
  async count(@Request() { user }) {
    const result = await this.service.getNotificationCount(user.id);

    return { status: 200 as const, body: result };
  }

  @TsRest(c.get)
  async get(
    @TsRestRequest() { params }: RequestShapes['get'],
    @Request() { user }
  ) {
    const notification = await this.service.getById(params.id);

    if (!notification || notification.user.id !== user.id) {
      throw new NotFoundException();
    }

    return { status: 200 as const, body: notification };
  }

  @TsRest(c.getAll)
  async getAll(
    @TsRestRequest() { query }: RequestShapes['getAll'],
    @Request() { user }
  ) {
    const notifications = await this.service.getAll({
      ...query,
      user: user.id,
    });

    return { status: 200 as const, body: notifications };
  }

  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.service.delete(params.id);

    return { status: 204 as const, body: '' };
  }

  @TsRest(c.read)
  async read(@TsRestRequest() { params }: RequestShapes['read']) {
    await this.service.read(params.id);

    return { status: 202 as const, body: '' };
  }

  @TsRest(c.readAll)
  async readAll(@Request() { user }) {
    await this.service.readAll(user.id);

    return { status: 202 as const, body: '' };
  }
}
