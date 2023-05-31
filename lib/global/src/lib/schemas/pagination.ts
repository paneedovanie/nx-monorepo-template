import { z } from 'zod';

export const PaginationOptionsSchema = z.object({
  search: z.string().optional(),
  page: z.preprocess(
    (a) => (a ? parseInt(z.string().parse(a)) : 1),
    z.number().positive().optional()
  ),
  perPage: z.preprocess(
    (a) => (a ? parseInt(z.string().parse(a)) : 5),
    z.number().optional()
  ),
  orderBy: z.string().optional(),
  orderDir: z.enum(['ASC', 'DESC']).optional(),
});

export const PaginationResponseSchema = z.object({
  count: z.number(),
  page: z.number(),
  perPage: z.number(),
});
