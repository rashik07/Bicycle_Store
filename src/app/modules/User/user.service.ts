/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

import { TUser } from './user.interface';
import { User } from './user.model';

import { TCustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createCustomerIntoDB = async (
  file: any,
  password: string,
  payload: TCustomer,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set customer role
  userData.role = 'customer';

  // set customer email
  userData.email = payload.email;
  userData.name = payload.name;

console.log('userData', userData);
  const session = await mongoose.startSession();
  // console.log(session.startTransaction);

  try {
    session.startTransaction();
    //set  generated id

    if (file) {
      const imageName = `${payload?.name}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array
console.log(newUser);
    //create a Customer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
  
    payload.user = newUser[0]._id; //reference _id

    // create a Customer (transaction-2)
    const newCustomer = await Customer.create([payload], { session });

    if (!newCustomer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Customer');
    }

    await session.commitTransaction();
    await session.endSession();

    return newCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set Customer role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;
  userData.name = payload.name;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();


    if (file) {
      const imageName = `${payload?.name}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
  
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// get personal details from db
const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    data,
    meta,
  };
};
export const UserServices = {
  createCustomerIntoDB,
  // createFacultyIntoDB,
  getAllUsersFromDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatus,
};
