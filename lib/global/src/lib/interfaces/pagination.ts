import { z } from 'zod';
import { PaginationOptionsSchema, PaginationResponseSchema } from '../schemas';

export type PaginationOptions = z.infer<typeof PaginationOptionsSchema>;

export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;
