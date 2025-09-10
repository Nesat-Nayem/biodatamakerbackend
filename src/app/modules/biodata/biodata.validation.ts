import { z } from 'zod';

const fieldSchema = z.object({
  label: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean().optional(),
  value: z.string().optional(),
  options: z.array(z.string()).optional(),
});

const sectionsSchema = z.record(z.string(), z.array(fieldSchema));

export const biodataCreateValidation = z.object({
  title: z.string().optional(),
  godName: z.string().optional(),
  sections: sectionsSchema,
  template: z.string().optional(),
  profilePhoto: z.string().optional(),
  godPhoto: z.string().optional(),
});

export const biodataUpdateValidation = z.object({
  title: z.string().optional(),
  godName: z.string().optional(),
  sections: sectionsSchema.optional(),
  template: z.string().optional(),
  profilePhoto: z.string().optional(),
  godPhoto: z.string().optional(),
});
