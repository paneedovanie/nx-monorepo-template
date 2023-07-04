import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  Controller,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { contract, RolePermission, Store } from '@nx-monorepo-template/global';
import {
  AllowUnauthorize,
  JwtAuthGuard,
  PermissionGuard,
} from '../../auth/guards';
import { Permissions } from '../../auth';
import { StoreService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadStorage } from '../../../helpers';
import { ParseBodyInterceptor } from '../../../interceptors';

const c = nestControllerContract(contract.store);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class StoreController implements NestControllerInterface<typeof c> {
  constructor(private readonly storeService: StoreService) {}
  @Permissions(RolePermission.StoreCreate)
  @UseInterceptors(
    FileInterceptor('image', { storage: uploadStorage }),
    ParseBodyInterceptor
  )
  @TsRest(c.create)
  async create(
    @TsRestRequest() { body }: RequestShapes['create'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const store = await this.storeService.create({
      ...body,
      image: image?.filename,
    });

    return { status: 201 as const, body: store };
  }

  @AllowUnauthorize()
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const store = await this.storeService.getById(params.id);

    if (!store) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: store };
  }

  @AllowUnauthorize()
  @TsRest(c.getAll)
  async getAll(
    @TsRestRequest() { query }: RequestShapes['getAll'],
    @Request() { user }
  ) {
    const { unrestricted, ...rest } = query;
    if (!unrestricted && user) {
      rest.owner = user.id;
    }
    const stores = await this.storeService.getAll(rest);

    return { status: 200 as const, body: stores };
  }

  @Permissions(RolePermission.StoreUpdate)
  @UseInterceptors(
    FileInterceptor('image', { storage: uploadStorage }),
    ParseBodyInterceptor
  )
  @TsRest(c.update)
  async update(
    @TsRestRequest() { params, body }: RequestShapes['update'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const updatedUser = await this.storeService.update(params.id, {
      ...body,
      image: image?.filename,
    });

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.StoreDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.storeService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
