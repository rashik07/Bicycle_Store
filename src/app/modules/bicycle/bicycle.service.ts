import { BicycleModel } from './bicycle.model';
import { Bicycle } from './bicycle.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createBicycleIntoDB = async (file: any,bicycle: Bicycle) => {
  // console.log(file);
  if (file) {
    const imageName = `${file?.filename}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    bicycle.productImg = secure_url as string;
  }
  console.log(bicycle);
  const result = await BicycleModel.create(bicycle);
  console.log("result",result); 
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
    const meta = await bicycleQuery.countTotal();
  const result = await bicycleQuery.modelQuery;


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

const getBrandsFromDB = async () => {
  const result = await BicycleModel.distinct('brand');

  return result;
};


export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getSpecificByBicycleFromDB,
  updateBicycleFromDB,
  deleteSpecificBicycleFromDB,
  getBrandsFromDB
};
