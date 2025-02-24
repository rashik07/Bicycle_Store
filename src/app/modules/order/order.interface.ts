import { Types } from 'mongoose';

export interface OrderProduct {
  bicycle: Types.ObjectId; // Reference to Bicycle model

}

export interface OrderBicyle {
  email: string;
  products: OrderProduct[]; // Array of products in the order
  address: string;
  totalPrice: number;
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'paid';
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  }

  createdAt?: Date;
  updatedAt?: Date;
}