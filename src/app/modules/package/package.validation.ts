import { z } from 'zod';

export const packageCreateValidation = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  aiDescription: z.string().optional(),
  proTip: z.string().optional(),
  packageName: z.string().min(1),
  packageSubtitle: z.string().optional(),
  badgeTitle: z.string().optional(),
  packagePrice: z.number().nonnegative(),
  packageDescription: z.string().min(1),
});

export const packageUpdateValidation = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  aiDescription: z.string().optional(),
  proTip: z.string().optional(),
  packageName: z.string().min(1).optional(),
  packageSubtitle: z.string().optional(),
  badgeTitle: z.string().optional(),
  packagePrice: z.number().nonnegative().optional(),
  packageDescription: z.string().min(1).optional(),
});
