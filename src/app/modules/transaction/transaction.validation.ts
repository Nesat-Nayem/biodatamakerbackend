import { z } from 'zod';

export const transactionCreateValidation = z.object({
  fullName: z.string().min(1),
  selectedPackage: z.string().min(1),
  payment: z.number().nonnegative(),
  paymentMode: z.string().min(1),
  status: z.enum(['pending', 'success', 'failed', 'cancelled']).optional(),
});

export const transactionUpdateValidation = z.object({
  fullName: z.string().min(1).optional(),
  selectedPackage: z.string().min(1).optional(),
  payment: z.number().nonnegative().optional(),
  paymentMode: z.string().min(1).optional(),
  status: z.enum(['pending', 'success', 'failed', 'cancelled']).optional(),
});
