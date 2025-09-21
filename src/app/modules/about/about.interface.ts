import { Document } from 'mongoose';

export interface IAboutUsSection {
  image: string;
  title: string;
  subtitle: string;
  url: string;
}

export interface ICounterSection {
  happyCustomers: number;
  electronicsProducts: number;
  activeSalesman: number;
  storeWorldwide: number;
}

export interface IAboutInfoSection {
  image: string;
  title: string;
  description: string;
}

export interface IWhyChooseItem {
  image: string;
  title: string;
  shortDesc: string;
}

export interface IAbout extends Document {
  // New top-level fields for About page
  title?: string;
  subtitle?: string;
  banner?: string;
  mission?: string;
  vision?: string;
  desc?: string;
  metaTitle?: string;
  metaTags?: string[];
  metaDesc?: string;

  aboutUs: IAboutUsSection;
  counter: ICounterSection;
  aboutInfo: IAboutInfoSection;
  whyChooseUs: IWhyChooseItem[]; // expect up to 3 items
  updatedAt: Date;
  createdAt: Date;
}
