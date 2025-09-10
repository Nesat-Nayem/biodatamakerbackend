import { Document } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  value: 'word' | 'editable' | 'image' | string;
  price: number;
  description?: string;
  label?: string;
  badgeColor?: string;
  isBest?: boolean;
  isActive: boolean;
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
