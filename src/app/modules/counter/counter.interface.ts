import { Document } from 'mongoose';

export interface ICounter extends Document {
  totalBiodataCreated: number;
  happyClients: number;
  dailyVisits: number;
  activeUsers: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
