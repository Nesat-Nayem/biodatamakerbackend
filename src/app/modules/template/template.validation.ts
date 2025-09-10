import { z } from 'zod';

export const templateCreateValidation = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  thumbnail: z.string().min(1),
  previewImages: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const templateUpdateValidation = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  thumbnail: z.string().min(1).optional(),
  previewImages: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});
