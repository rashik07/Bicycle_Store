import { Bicycle, IBicycle } from './bicycle.interface';
import { Schema, model, connect } from 'mongoose';

// import validator from 'validator';
// import isEmail from 'validator/lib/isEmail';

const bicycleSchema = new Schema<Bicycle>(
  {
    name: {
      type: String,
      required: true,
      // trim: true,
    },
    brand: {
      type: String,
      required: true,
      // trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: function () {
        return this.quantity > 0;
      },
    },
    productImg: { type: String, default: '' },
  },
  { timestamps: true }, // Automatically adds `createdAt` and `updatedAt`
);

bicycleSchema.statics.isBicycleExists = async function (
  id: string,
): Promise<Bicycle | null> {
  return await BicycleModel.findOne({ _id: id });
};
// 3. Create a Model.
export const BicycleModel = model<Bicycle, IBicycle>('Bicycle', bicycleSchema);
