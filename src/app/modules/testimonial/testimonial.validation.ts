import { z } from 'zod';

export const testimonialCreateValidation = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['active', 'inactive']).optional(),
});

export const testimonialUpdateValidation = z.object({
  name: z.string().min(1).optional(),
  designation: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
