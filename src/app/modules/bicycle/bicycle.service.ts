import { BicycleModel } from './bicycle.model';
import { Bicycle } from './bicycle.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createBicycleIntoDB = async (bicycle: Bicycle) => {
  const result = await BicycleModel.create(bicycle);

  return result;
};

const getAllBicycleFromDB = async (query: Record<string, unknown>) => {
  // const result = await BicycleModel.find();
  // return result;
  const bicycleQuery = new QueryBuilder(BicycleModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bicycleQuery.modelQuery;
  const meta = await bicycleQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSpecificByBicycleFromDB = async (_id: string) => {
  const result = await BicycleModel.findOne({ _id });

  return result;
};

const updateBicycleFromDB = async (_id: string, updatedData: Bicycle) => {
  const result = await BicycleModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSpecificBicycleFromDB = async (_id: string) => {
  const result = await BicycleModel.findOneAndDelete({ _id });

  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getSpecificByBicycleFromDB,
  updateBicycleFromDB,
  deleteSpecificBicycleFromDB,
};
