import { Bicyle } from './bicyle.interface';
import { Schema, model, connect } from 'mongoose';

// import validator from 'validator';
// import isEmail from 'validator/lib/isEmail';

const bicyleSchema = new Schema<Bicyle>({
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
},
{ timestamps: true } // Automatically adds `createdAt` and `updatedAt`

);

// Add pre-save middleware to auto-update inStock
bicyleSchema.pre('save', function (next) {
  this.inStock = this.quantity > 0;
  next();
});

// 3. Create a Model.
export const BicyleModel = model<Bicyle>('Bicycle', bicyleSchema);
