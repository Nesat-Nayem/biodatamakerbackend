import { Document, Types } from 'mongoose';

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'refunded' | 'failed';
export type OrderStatus = 'created' | 'completed' | 'cancelled';

export interface IPaymentInfo {
  method?: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cash_on_delivery';
  status?: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  paymentDate?: Date;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: Types.ObjectId;
  plan?: Types.ObjectId; // ref Plan
  planValue?: string;
  template?: Types.ObjectId; // ref Template
  biodata?: Types.ObjectId; // ref Biodata
  totalAmount: number; // rupees
  currency: string; // INR
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  paymentInfo: IPaymentInfo;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
