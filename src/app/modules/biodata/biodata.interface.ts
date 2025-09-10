import { Document, Types } from 'mongoose';

export interface IField {
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  options?: string[];
}

export interface ISections {
  [key: string]: IField[];
}

export interface IBiodata extends Document {
  title?: string;
  godName?: string;
  sections: ISections;
  template?: Types.ObjectId;
  profilePhoto?: string;
  godPhoto?: string;
  user?: Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
