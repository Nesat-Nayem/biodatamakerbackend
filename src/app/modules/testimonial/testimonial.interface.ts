import { Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  description: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
