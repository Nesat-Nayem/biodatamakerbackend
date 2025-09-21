import { z } from 'zod';

export const counterCreateValidation = z.object({
  totalBiodataCreated: z.number().nonnegative(),
  happyClients: z.number().nonnegative(),
  dailyVisits: z.number().nonnegative(),
  activeUsers: z.number().nonnegative(),
});

export const counterUpdateValidation = z.object({
  totalBiodataCreated: z.number().nonnegative().optional(),
  happyClients: z.number().nonnegative().optional(),
  dailyVisits: z.number().nonnegative().optional(),
  activeUsers: z.number().nonnegative().optional(),
});
