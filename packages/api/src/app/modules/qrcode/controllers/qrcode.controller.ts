import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Controller } from '@nestjs/common';
import { contract, generateQrcode } from '@nx-monorepo-template/global';

const c = nestControllerContract(contract.qrcode);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class QrcodeController implements NestControllerInterface<typeof c> {
  @TsRest(c.get)
  async get(@TsRestRequest() { query }: RequestShapes['get']) {
    const qrcode = await generateQrcode(query.text, query.logo);

    if (!qrcode) {
      return { status: 404 as const, body: null };
    }

    return { status: 200 as const, body: { qrcode } };
  }
}
