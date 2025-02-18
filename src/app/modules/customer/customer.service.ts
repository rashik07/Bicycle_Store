import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { customerSearchableFields } from './customer.constant';

import { Customer } from './customer.model';
import { TCustomer } from './customer.interface';

const getAllCustomersFromDB = async (query: Record<string, unknown>) => {
  const CustomerQuery = new QueryBuilder(
    Customer.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(customerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await CustomerQuery.countTotal();
  const result = await CustomerQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleCustomerFromDB = async (id: string) => {
  const result = await Customer.findById(id)
 
  return result;
};

const updateCustomerIntoDB = async (id: string, payload: Partial<TCustomer>) => {
  const { name, ...remainingCustomerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCustomerData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }


  const result = await Customer.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCustomerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Customer');
    }

    // get user _id from deletedCustomer
    const userId = deletedCustomer.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedCustomer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete Customer');
  }
};

export const CustomerServices = {
  getAllCustomersFromDB,
  getSingleCustomerFromDB,
  updateCustomerIntoDB,
  deleteCustomerFromDB,
};
