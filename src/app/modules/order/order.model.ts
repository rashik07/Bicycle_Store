import mongoose, { Schema, model } from 'mongoose';
import { OrderBicyle } from './order.interface';

const orderBicyleSchema = new Schema<OrderBicyle>(
  {
    email: { type: String, required: true },
    products: [],
    address: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled', 'paid'],
        default: 'pending',
      },
      transaction: {
        paymentId: {
          type: String,
        },
        transactionStatus: {
          type: String,
        },
        bank_status: {
          type: String,
        },
        sp_code: {
          type: String,
        },
        sp_message: {
          type: String,
        },
        method: {
          type: String,
        },
        date_time: {
          type: String,
        },
      },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export const OrderBicyleModel = model<OrderBicyle>('OrderBicycle', orderBicyleSchema);