import { Document } from 'mongoose';

export interface ICoreCard {
  title: string;
  subtitle: string;
}

export interface ICoreFunctions extends Document {
  title: string;
  subtitle?: string;
  banner: string; // image URL
  cards: ICoreCard[]; // up to 3 items
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
