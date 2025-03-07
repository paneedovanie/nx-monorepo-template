import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  Controller,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  contract,
  CreateProduct,
  RolePermission,
  UpdateProduct,
} from '@nx-monorepo-template/global';
import { JwtAuthGuard, PermissionGuard } from '../../auth/guards';
import { Permissions } from '../../auth';
import { ProductService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseBodyInterceptor } from '../../../interceptors';
import { FileService } from '../../../file';

const c = nestControllerContract(contract.product);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class ProductController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService
  ) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.ProductCreate)
  @UseInterceptors(FileInterceptor('image'), ParseBodyInterceptor)
  @TsRest(c.create)
  async create(
    @TsRestRequest() { body }: RequestShapes['create'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const input = body as CreateProduct & { image?: string };

    if (image) {
      const uploadedPath = await this.fileService.uploadFile('product', image);
      input.image = uploadedPath;
    }

    const product = await this.productService.create(input);

    return { status: 201 as const, body: product };
  }

  @Permissions(RolePermission.ProductGet)
  @TsRest(c.get)
  async get(@TsRestRequest() { params }: RequestShapes['get']) {
    const product = await this.productService.getById(params.id);

    if (!product) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: product };
  }

  @Permissions(RolePermission.ProductGetAll)
  @TsRest(c.getAll)
  async getAll(@TsRestRequest() { query }: RequestShapes['getAll']) {
    const users = await this.productService.getAll(query);

    return { status: 200 as const, body: users };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.ProductUpdate)
  @UseInterceptors(FileInterceptor('image'), ParseBodyInterceptor)
  @TsRest(c.update)
  async update(
    @TsRestRequest() { params, body }: RequestShapes['update'],
    @UploadedFile() image: Express.Multer.File
  ) {
    const input = body as UpdateProduct & { image?: string };

    if (image) {
      const uploadedPath = await this.fileService.uploadFile('product', image);
      input.image = uploadedPath;
    }

    const updatedUser = await this.productService.update(params.id, input);

    return { status: 201 as const, body: updatedUser };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.ProductDelete)
  @TsRest(c.delete)
  async delete(@TsRestRequest() { params }: RequestShapes['delete']) {
    await this.productService.delete(params.id);

    return { status: 204 as const, body: '' };
  }
}
