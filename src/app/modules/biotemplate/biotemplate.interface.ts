import { Document } from 'mongoose';

export interface IBioTemplate extends Document {
  templatename: string;
  banner: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
