import { z } from 'zod';

const compareItemSchema = z.object({
  title: z.string().min(1),
  value: z.boolean(),
});

export const compareCreateValidation = z.object({
  title: z.string().min(1),
  banner1: z.string().min(1),
  banner2: z.string().min(1),
  compare: z.array(compareItemSchema).optional(),
});

export const compareUpdateValidation = z.object({
  title: z.string().min(1).optional(),
  banner1: z.string().min(1).optional(),
  banner2: z.string().min(1).optional(),
  compare: z.array(compareItemSchema).optional(),
});
