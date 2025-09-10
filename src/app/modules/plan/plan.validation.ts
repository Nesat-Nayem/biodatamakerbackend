import { z } from 'zod';

export const planCreateValidation = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  price: z.number().nonnegative(),
  description: z.string().optional(),
  label: z.string().optional(),
  badgeColor: z.string().optional(),
  isBest: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const planUpdateValidation = z.object({
  name: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  description: z.string().optional(),
  label: z.string().optional(),
  badgeColor: z.string().optional(),
  isBest: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});
