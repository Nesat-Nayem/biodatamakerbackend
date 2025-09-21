import { z } from 'zod';

export const templateCreateValidation = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  thumbnail: z.string().min(1),
  previewImages: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  // Newly added optional fields
  title: z.string().optional(),
  subtitle: z.string().optional(),
  banners: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoTags: z.array(z.string()).optional(),
  seoDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const templateUpdateValidation = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  thumbnail: z.string().min(1).optional(),
  previewImages: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  banners: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoTags: z.array(z.string()).optional(),
  seoDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});
