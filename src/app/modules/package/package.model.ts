import mongoose, { Schema } from 'mongoose';
import { IPackage } from './package.interface';

const PackageSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    aiDescription: { type: String, trim: true },
    proTip: { type: String, trim: true },
    packageName: { type: String, required: true, trim: true },
    packageSubtitle: { type: String, trim: true },
    badgeTitle: { type: String, trim: true },
    packagePrice: { type: Number, required: true, min: 0 },
    packageDescription: { type: String, required: true, trim: true },
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

export const Package = mongoose.model<IPackage>('Package', PackageSchema);
