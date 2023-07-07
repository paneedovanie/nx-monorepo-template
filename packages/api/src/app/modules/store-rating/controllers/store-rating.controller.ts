import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { contract } from '@nx-monorepo-template/global';
import {
  AllowUnauthorize,
  JwtAuthGuard,
  PermissionGuard,
} from '../../auth/guards';
import { StoreRatingService } from '../services';
import { ParseBodyInterceptor } from '../../../interceptors';

const c = nestControllerContract(contract.storeRating);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class StoreRatingController
  implements NestControllerInterface<typeof c>
{
  constructor(private readonly storeRatingService: StoreRatingService) {}
  @TsRest(c.create)
  async create(@TsRestRequest() { body }: RequestShapes['create']) {
    const store = await this.storeRatingService.create(body);

    return { status: 201 as const, body: store };
  }

  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const store = await this.storeRatingService.getById(params.id);

    if (!store) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: store };
  }

  @AllowUnauthorize()
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const stores = await this.storeRatingService.getAll(query);

    return { status: 200 as const, body: stores };
  }

  @UseInterceptors(ParseBodyInterceptor)
  @TsRest(c.update)
  async update(@TsRestRequest() { body }: RequestShapes['update']) {
    const updatedUser = await this.storeRatingService.update(
      {
        userId: body.user,
        storeId: body.store,
      },
      body
    );

    return { status: 201 as const, body: updatedUser };
  }

  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.storeRatingService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
