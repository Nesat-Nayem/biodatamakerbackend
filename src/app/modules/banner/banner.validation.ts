import { z } from 'zod';

const buttonSchema = z.object({
  label: z.string().min(1, 'Button label is required'),
  href: z.string().min(1, 'Button href is required'),
});

export const bannerValidation = z.object({
  title: z.string().min(1, 'Banner title is required'),
  description: z.string().min(1, 'Banner description is required'),
  image: z.string().min(1, 'Image is required'),
  primaryButton: buttonSchema,
  secondaryButton: buttonSchema.partial().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});

export const bannerUpdateValidation = z.object({
  title: z.string().min(1, 'Banner title is required').optional(),
  description: z.string().min(1, 'Banner description is required').optional(),
  image: z.string().min(1, 'Image is required').optional(),
  primaryButton: buttonSchema.partial().optional(),
  secondaryButton: buttonSchema.partial().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});


