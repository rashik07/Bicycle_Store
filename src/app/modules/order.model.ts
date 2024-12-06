
import mongoose, { Schema, model, connect } from 'mongoose';
import { OrderBicyle } from './order/order.interface';
import { string } from 'zod';

// import validator from 'validator';
// import isEmail from 'validator/lib/isEmail';

const orderBicyleSchema = new Schema<OrderBicyle>({
    email: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicycle', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
},
{ timestamps: true } // Automatically adds `createdAt` and `updatedAt`

);


// orderBicyleSchema.pre('aggregate', function(next) {
//     console.log(this.pipeline());
//     next();
//   });

// 3. Create a Model.
export const OrderBicyleModel = model<OrderBicyle>('OrderBicycle', orderBicyleSchema);
