import { BicyleModel } from '../bicycle.model';
import { Bicyle } from './bicyle.interface';

const createBicyleIntoDB = async (bicyle: Bicyle) => {
  const result = await BicyleModel.create(bicyle);

  return result;
};

const getAllBicyleFromDB = async () => {
  const result = await BicyleModel.find();
  return result;
};

const getSpecificByBicyleFromDB = async (_id: string) => {

  const result = await BicyleModel.findOne({ _id });

  return result;
};

const updateBicyleFromDB = async (_id: string, updatedData: Bicyle) => {
  const result = await BicyleModel.findByIdAndUpdate(_id, updatedData, {
    new: true, 
    runValidators: true, 
  });
  return result;
};

const deleteSpecificBicyleFromDB = async (_id: string) => {
  const result = await BicyleModel.findOneAndDelete({ _id });

  return result;
};


export const BicyleServices = {
  createBicyleIntoDB,
  getAllBicyleFromDB,
  getSpecificByBicyleFromDB,
  updateBicyleFromDB,
  deleteSpecificBicyleFromDB
};
