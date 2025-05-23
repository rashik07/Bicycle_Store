import { Bicycle } from './bicycle.interface';

import { BicycleServices } from './bicycle.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createBicycle = catchAsync(async (req, res) => {
  const bicycleData = req.body;

  //will call service function to send this data
  const result = await BicycleServices.createBicycleIntoDB(req.file,bicycleData);
  //send response Bicycle created successfully
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

const getAllBicycle = catchAsync(async (req, res) => {
  const result = await BicycleServices.getAllBicycleFromDB(req.query);

  //send response

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result,
  });
});

const getSpecificByBicycle = catchAsync(async (req, res) => {
  const { productId: _id } = req.params;

  const result = await BicycleServices.getSpecificByBicycleFromDB(_id);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycles retrieved one successfully',
    data: result,
  });
});

const updateSpecificByBicycle = catchAsync(async (req, res) => {
  const { productId: _id } = req.params;
  const updatedData = req.body;
  const result = await BicycleServices.updateBicycleFromDB(req.file,_id, updatedData);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle updated successfully',
    data: result,
  });
});

const deleteSpecificBicycle = catchAsync(async (req, res) => {

    const { productId: _id } = req.params;

    const result = await BicycleServices.deleteSpecificBicycleFromDB(_id);

    // if (!result) {
    //   return res.status(404).json({ message: 'Bicycle not found' });
    // }
    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bicycle deleted successfully',
      data: result,
    });
  
});

const getBrands = catchAsync(async (req, res) => {
  const result = await BicycleServices.getBrandsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully',
    data: result,
  });
});

export const BicycleControllers = {
  createBicycle,
  getAllBicycle,
  getSpecificByBicycle,
  updateSpecificByBicycle,
  deleteSpecificBicycle,
  getBrands
};
