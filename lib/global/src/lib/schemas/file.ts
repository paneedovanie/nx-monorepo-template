import { z } from 'zod';

export const FileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number().positive(),
});
