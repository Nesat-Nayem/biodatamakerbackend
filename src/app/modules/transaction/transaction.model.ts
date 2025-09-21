import mongoose, { Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

const TransactionSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    selectedPackage: { type: String, required: true, trim: true },
    payment: { type: Number, required: true, min: 0 },
    paymentMode: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'success', 'failed', 'cancelled'], default: 'pending' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        (ret as any).createdAt = new Date((ret as any).createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        (ret as any).updatedAt = new Date((ret as any).updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      },
    },
  }
);

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
