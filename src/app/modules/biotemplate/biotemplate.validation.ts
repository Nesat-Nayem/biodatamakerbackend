import { z } from 'zod';

export const biotemplateValidation = z.object({
  templatename: z.string().min(1, 'Template name is required'),
  banner: z.string().min(1, 'Banner is required'),
});

export const biotemplateUpdateValidation = z.object({
  templatename: z.string().min(1, 'Template name is required').optional(),
  banner: z.string().min(1, 'Banner is required').optional(),
});
