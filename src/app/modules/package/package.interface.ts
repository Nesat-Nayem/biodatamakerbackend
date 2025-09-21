import { Document } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  subtitle?: string;
  aiDescription?: string;
  proTip?: string;
  packageName: string;
  packageSubtitle?: string;
  badgeTitle?: string;
  packagePrice: number;
  packageDescription: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
