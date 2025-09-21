import { z } from 'zod';

const stepsCardSchema = z.object({
  title: z.string().min(1),
  icon: z.string().min(1),
  desc: z.string().min(1),
});

export const stepsCreateValidation = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  cards: z.array(stepsCardSchema).length(3, 'Must provide exactly 3 cards'),
});

export const stepsUpdateValidation = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  cards: z.array(stepsCardSchema).length(3).optional(),
});
