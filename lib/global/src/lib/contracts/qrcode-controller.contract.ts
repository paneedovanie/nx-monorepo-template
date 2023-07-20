import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const prefix = `/api/v1/qrcodes`;

export const qrcode = initContract().router({
  get: {
    method: 'GET',
    path: `${prefix}`,
    query: z.object({
      text: z.string(),
      logo: z.string().optional(),
    }),
    responses: {
      200: z.object({ qrcode: z.string() }),
    },
    summary: 'Generate qrcode',
  },
});
