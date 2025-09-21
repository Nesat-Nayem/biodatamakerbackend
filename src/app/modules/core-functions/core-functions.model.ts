import mongoose, { Schema } from 'mongoose';
import { ICoreFunctions } from './core-functions.interface';

const CoreCardSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CoreFunctionsSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    banner: { type: String, required: true },
    cards: { type: [CoreCardSchema], validate: [(val: any[]) => Array.isArray(val) && val.length === 3, 'Must have exactly 3 cards'] },
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

export const CoreFunctions = mongoose.model<ICoreFunctions>('CoreFunctions', CoreFunctionsSchema);
