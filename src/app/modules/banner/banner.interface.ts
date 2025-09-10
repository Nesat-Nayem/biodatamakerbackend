import { Document } from 'mongoose';


export interface Button {
  label: string;
  href: string;
}

export interface IBanner extends Document {
  title: string;
  description: string;
  image: string;
  primaryButton: Button;
  secondaryButton?: Button;
  isActive: boolean;
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}




