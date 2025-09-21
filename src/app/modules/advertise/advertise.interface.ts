import { Document } from 'mongoose';

export interface IAdvertise extends Document {
  banner: string; // image URL
  url: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
