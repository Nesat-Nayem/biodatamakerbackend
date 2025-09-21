import mongoose, { Schema } from 'mongoose';
import { IAdvertise } from './advertise.interface';

const AdvertiseSchema: Schema = new Schema(
  {
    banner: { type: String, required: true },
    url: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
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

export const Advertise = mongoose.model<IAdvertise>('Advertise', AdvertiseSchema);
