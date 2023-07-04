import { z } from 'zod';

export const UnrestrictedSchema = z.object({
  unrestricted: z.preprocess((a) => a && a === 'true', z.boolean().optional()),
});
