import { Document } from 'mongoose';

export interface IStepsCard {
  title: string;
  icon: string;
  desc: string;
}

export interface ISteps extends Document {
  title: string;
  subtitle?: string;
  cards: IStepsCard[]; // exactly 3
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
