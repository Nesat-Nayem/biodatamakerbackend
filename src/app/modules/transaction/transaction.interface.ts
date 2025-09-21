import { Document } from 'mongoose';

export type TransactionStatus = 'pending' | 'success' | 'failed' | 'cancelled';

export interface ITransaction extends Document {
  fullName: string;
  selectedPackage: string; // package name or ID reference as string
  payment: number; // amount
  paymentMode: string; // e.g., card, upi, cod
  status: TransactionStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
