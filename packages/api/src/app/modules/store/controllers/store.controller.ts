import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  ConflictException,
  Controller,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  contract,
  CreateStore,
  RolePermission,
  TokenUser,
  UpdateStore,
} from '@nx-monorepo-template/global';
import {
  AllowUnauthorize,
  JwtAuthGuard,
  PermissionGuard,
} from '../../auth/guards';
import { Permissions } from '../../auth';
import { StoreService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseBodyInterceptor } from '../../../interceptors';
import { FileService } from '../../../file';
import { CategoryService } from '../../category';

const c = nestControllerContract(contract.store);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class StoreController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly storeService: StoreService,
    private readonly fileService: FileService,
    private readonly categoryService: CategoryService
  ) {}
  @Permissions(RolePermission.StoreCreate)
  @UseInterceptors(FileInterceptor('image'), ParseBodyInterceptor)
  @TsRest(c.create)
  async create(
    @TsRestRequest() { body }: RequestShapes['create'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const input = body as CreateStore & { image?: string };

    if (image) {
      const uploadedPath = await this.fileService.uploadFile('shop', image);
      input.image = uploadedPath;
    }

    const store = await this.storeService.create(input);

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
    @Request() { user }: { user: TokenUser }
  ) {
    const { unrestricted, isEmployee, ...rest } = query;
    if (isEmployee) {
      rest.ids = user.jobs.map((job) => job.store.id);
    } else if (!unrestricted && user) {
      rest.owner = user.id;
    }

    const stores = await this.storeService.getAll(rest);

    return { status: 200 as const, body: stores };
  }

  @Permissions(RolePermission.StoreUpdate)
  @UseInterceptors(FileInterceptor('image'), ParseBodyInterceptor)
  @TsRest(c.update)
  async update(
    @TsRestRequest() { params, body }: RequestShapes['update'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const input = body as UpdateStore & { image?: string };

    if (image) {
      const uploadedPath = await this.fileService.uploadFile('shop', image);
      input.image = uploadedPath;
    }
    const updatedUser = await this.storeService.update(params.id, input);

    return { status: 201 as const, body: updatedUser };
  }

  @Permissions(RolePermission.StoreDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    const category = await this.categoryService.get({
      store: { id: params.id },
    });

    if (category) {
      throw new ConflictException(`Store still linked to a category`);
    }

    await this.storeService.delete(params.id, true);

    return { status: 204 as const, body: '' };
  }

  @Permissions(RolePermission.StoreUpdate)
  @TsRest(c.updateConfig)
  async updateConfig(
    @TsRestRequest() { params, body }: RequestShapes['updateConfig']
  ) {
    const updatedUser = await this.storeService.updateConfig(params.id, body);

    return { status: 201 as const, body: updatedUser };
  }
}
