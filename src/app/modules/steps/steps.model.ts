import mongoose, { Schema } from 'mongoose';
import { ISteps } from './steps.interface';

const StepsCardSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const StepsSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    cards: { type: [StepsCardSchema], validate: [(val: any[]) => Array.isArray(val) && val.length === 3, 'Must have exactly 3 cards'] },
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

export const Steps = mongoose.model<ISteps>('Steps', StepsSchema);
