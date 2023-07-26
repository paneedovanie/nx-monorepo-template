import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards, Request } from '@nestjs/common';
import { contract, RolePermission } from '@nx-monorepo-template/global';
import { AuthService } from '../services';
import { JwtAuthGuard, LocalAuthGuard, PermissionGuard } from '../guards';
import { Permissions } from '../decorators';

const c = nestControllerContract(contract.auth);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class AuthController implements NestControllerInterface<typeof c> {
  constructor(private readonly authService: AuthService) {}

  @TsRest(c.register)
  async register(@TsRestRequest() { body }: RequestShapes['register']) {
    const user = await this.authService.register(body);

    return { status: 201 as const, body: user };
  }

  @UseGuards(LocalAuthGuard)
  @TsRest(c.login)
  async login(@Request() { user }) {
    const result = await this.authService.login(user);

    return { status: 201 as const, body: result };
  }

  @UseGuards(JwtAuthGuard)
  @TsRest(c.verify)
  async verify(@Request() { user }) {
    return { status: 201 as const, body: user };
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions(RolePermission.AuthChangePassword)
  @TsRest(c.changePassword)
  async changePassword(
    @Request() { user },
    @TsRestRequest()
    { body }: RequestShapes['changePassword']
  ) {
    await this.authService.changePassword(user.id, body);
    return { status: 201 as const, body: user };
  }

  @TsRest(c.verifyEmail)
  async verifyEmail(
    @TsRestRequest()
    { query }: RequestShapes['verifyEmail']
  ) {
    const user = await this.authService.verifyEmail(query.accessToken);
    return { status: 201 as const, body: user };
  }

  @UseGuards(JwtAuthGuard)
  @TsRest(c.resendVerifyEmail)
  async resendVerifyEmail(@Request() { user }) {
    const result = await this.authService.resendVerifyEmail(user.id);
    return { status: 201 as const, body: result };
  }

  @TsRest(c.forgotPassword)
  async forgotPassword(
    @TsRestRequest()
    { body }: RequestShapes['forgotPassword']
  ) {
    await this.authService.forgotPassword(body.email);
    return { status: 201 as const, body: true };
  }

  @UseGuards(JwtAuthGuard)
  @TsRest(c.resetPassword)
  async resetPassword(
    @Request() { user },
    @TsRestRequest()
    { body }: RequestShapes['resetPassword']
  ) {
    await this.authService.resetPassword(user.id, body);
    return { status: 201 as const, body: true };
  }
}
