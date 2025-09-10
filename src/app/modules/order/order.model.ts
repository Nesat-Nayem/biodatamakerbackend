import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const PaymentInfoSchema: Schema = new Schema(
  {
    method: { type: String, enum: ['card', 'upi', 'netbanking', 'wallet', 'cash_on_delivery'], default: undefined },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: undefined },
    transactionId: { type: String },
    paymentDate: { type: Date },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    planValue: { type: String },
    template: { type: Schema.Types.ObjectId, ref: 'Template' },
    biodata: { type: Schema.Types.ObjectId, ref: 'Biodata' },
    totalAmount: { type: Number, required: true, min: 0 }, // rupees
    currency: { type: String, default: 'INR' },
    paymentStatus: { type: String, enum: ['unpaid', 'pending', 'paid', 'refunded', 'failed'], default: 'unpaid' },
    status: { type: String, enum: ['created', 'completed', 'cancelled'], default: 'created' },
    paymentInfo: { type: PaymentInfoSchema, default: {} },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        (ret as any).createdAt = new Date((ret as any).createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        (ret as any).updatedAt = new Date((ret as any).updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      },
    },
  }
);

OrderSchema.pre('validate', function (next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
