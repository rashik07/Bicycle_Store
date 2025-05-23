import { Schema, model } from 'mongoose';
import { CustomerModel, TCustomer } from './customer.interface';



const customerSchema = new Schema<TCustomer, CustomerModel>(
  {
   
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      // required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      // required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String },
    emergencyContactNo: {
      type: String,
      // required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      // required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      // required: [true, 'Permanent address is required'],
    },
   
    profileImg: { type: String, default: '' },
  
    isDeleted: {
      type: Boolean,
      default: false,
    },
  
  
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
// customerSchema.virtual('fullName').get(function () {
//   return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
// });

// Query Middleware
customerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
customerSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Customer.findOne({ email });
  return existingUser;
};

export const Customer = model<TCustomer, CustomerModel>('Customer', customerSchema);
