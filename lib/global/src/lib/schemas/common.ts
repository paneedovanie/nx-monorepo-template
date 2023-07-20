import { z } from 'zod';

export const CurrencySchema = z.number().max(1_000_000_000_000_000).min(0.01);
