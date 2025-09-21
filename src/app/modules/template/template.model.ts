import mongoose, { Schema } from 'mongoose';
import { ITemplate } from './template.interface';

const TemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnail: { type: String, required: true },
    previewImages: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    // Newly added fields
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    banners: { type: [String], default: [] },
    seoTitle: { type: String, trim: true },
    seoTags: { type: [String], default: [] },
    seoDescription: { type: String, trim: true },
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

export const Template = mongoose.model<ITemplate>('Template', TemplateSchema);
