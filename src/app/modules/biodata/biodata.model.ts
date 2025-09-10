import mongoose, { Schema } from 'mongoose';
import { IBiodata } from './biodata.interface';

const FieldSchema: Schema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    required: { type: Boolean, default: false },
    value: { type: String },
    options: { type: [String], default: [] },
  },
  { _id: false }
);

const SectionsSchema: Schema = new Schema({}, { strict: false, _id: false });

const BiodataSchema: Schema = new Schema(
  {
    title: { type: String, trim: true },
    godName: { type: String, trim: true },
    sections: { type: Schema.Types.Mixed, required: true },
    template: { type: Schema.Types.ObjectId, ref: 'Template' },
    profilePhoto: { type: String },
    godPhoto: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
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

export const Biodata = mongoose.model<IBiodata>('Biodata', BiodataSchema);
