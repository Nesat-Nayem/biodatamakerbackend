import { z } from 'zod';

const coreCardSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
});

export const coreFunctionsCreateValidation = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  banner: z.string().min(1),
  cards: z.array(coreCardSchema).length(3, 'Must provide exactly 3 cards'),
});

export const coreFunctionsUpdateValidation = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  banner: z.string().min(1).optional(),
  cards: z.array(coreCardSchema).length(3).optional(),
});
