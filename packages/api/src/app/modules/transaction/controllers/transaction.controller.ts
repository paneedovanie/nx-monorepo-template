import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller, UseGuards, Request } from '@nestjs/common';
import { contract, RolePermission } from '@nx-monorepo-template/global';
import { TransactionService } from '../services';
import { JwtAuthGuard, PermissionGuard } from '../../auth/guards';
import { Permissions } from '../../auth';

const c = nestControllerContract(contract.transaction);
type RequestShapes = NestRequestShapes<typeof c>;

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller()
export class TransactionController
  implements NestControllerInterface<typeof c>
{
  constructor(private readonly transactionService: TransactionService) {}

  @Permissions(RolePermission.TransactionBalance)
  @TsRest(c.balance)
  async balance(@Request() { user }) {
    const result = await this.transactionService.balance(user.id);
    return { status: 200 as const, body: result };
  }

  @Permissions(RolePermission.TransactionGenerate)
  @TsRest(c.generate)
  async generate(
    @TsRestRequest()
    { body }: RequestShapes['generate']
  ) {
    const result = await this.transactionService.generate(body);
    return { status: 201 as const, body: result };
  }

  @Permissions(RolePermission.TransactionTransfer)
  @TsRest(c.transfer)
  async transfer(
    @Request() { user },
    @TsRestRequest()
    { body }: RequestShapes['transfer']
  ) {
    const result = await this.transactionService.transfer(body, user.id);
    return { status: 201 as const, body: result };
  }

  @Permissions(RolePermission.TransactionGetTransactions)
  @TsRest(c.getAll)
  async getAll(
    @TsRestRequest()
    { query }: RequestShapes['getAll']
  ) {
    const result = await this.transactionService.getAll(query);
    return { status: 200 as const, body: result };
  }

  @TsRest(c.pay)
  async pay(
    @Request() { user },
    @TsRestRequest()
    { body }: RequestShapes['pay']
  ) {
    const result = await this.transactionService.pay(body, user.id);
    return { status: 201 as const, body: result };
  }
}
