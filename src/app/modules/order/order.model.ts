import { Schema, model } from 'mongoose';
import { TOrderProduct } from './order.interface';

const orderSchema = new Schema<TOrderProduct>(
  {
    orderId: {
      type: String,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
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
  {
    timestamps: true,
  },
);

export const OrderBicyleModel = model<TOrderProduct>('Order', orderSchema);