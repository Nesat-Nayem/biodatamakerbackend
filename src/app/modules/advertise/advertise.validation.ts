import { z } from 'zod';

export const advertiseCreateValidation = z.object({
  banner: z.string().min(1),
  url: z.string().min(1),
  status: z.enum(['active', 'inactive']).optional(),
});

export const advertiseUpdateValidation = z.object({
  banner: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
