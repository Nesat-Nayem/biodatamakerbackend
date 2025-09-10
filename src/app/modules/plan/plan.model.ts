import mongoose, { Schema } from 'mongoose';
import { IPlan } from './plan.interface';

const PlanSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    value: { type: String, required: true, unique: true, lowercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    label: { type: String },
    badgeColor: { type: String },
    isBest: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
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

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);
