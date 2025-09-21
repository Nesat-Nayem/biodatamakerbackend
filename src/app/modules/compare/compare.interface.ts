import { Document } from 'mongoose';

export interface ICompareItem {
  title: string;
  value: boolean; // true for yes, false for no
}

export interface ICompare extends Document {
  title: string;
  banner1: string;
  banner2: string;
  compare: ICompareItem[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
