import mongoose, { Schema } from 'mongoose';
import { ICompare } from './compare.interface';

const CompareItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    value: { type: Boolean, required: true },
  },
  { _id: false }
);

const CompareSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    banner1: { type: String, required: true },
    banner2: { type: String, required: true },
    compare: { type: [CompareItemSchema], default: [] },
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

export const Compare = mongoose.model<ICompare>('Compare', CompareSchema);
