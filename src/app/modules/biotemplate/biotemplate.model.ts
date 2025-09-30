import mongoose, { Schema } from 'mongoose';
import { IBioTemplate } from './biotemplate.interface';

const BioTemplateSchema: Schema = new Schema(
  {
    templatename: { 
      type: String, 
      required: true,
      trim: true
    },
    banner: {
      type: String,
      required: true,
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true,
    toJSON: { 
      transform: function(doc, ret) {
        (ret as any).createdAt = new Date((ret as any).createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        (ret as any).updatedAt = new Date((ret as any).updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      }
    }
  }
);

export const BioTemplate = mongoose.model<IBioTemplate>('BioTemplate', BioTemplateSchema);
