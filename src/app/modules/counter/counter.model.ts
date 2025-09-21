import mongoose, { Schema } from 'mongoose';
import { ICounter } from './counter.interface';

const CounterSchema: Schema = new Schema(
  {
    totalBiodataCreated: { type: Number, required: true, min: 0, default: 0 },
    happyClients: { type: Number, required: true, min: 0, default: 0 },
    dailyVisits: { type: Number, required: true, min: 0, default: 0 },
    activeUsers: { type: Number, required: true, min: 0, default: 0 },
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

export const Counter = mongoose.model<ICounter>('Counter', CounterSchema);
