import { Document } from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  slug: string;
  thumbnail: string;
  previewImages?: string[];
  categories?: string[];
  isActive: boolean;
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
