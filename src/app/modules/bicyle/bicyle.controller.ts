import { Bicyle } from './bicyle.interface';

import { Request, Response } from 'express';
import { BicyleServices } from './bicyle.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createBicyle =  catchAsync(async (req, res) => {

    const  bicyleData  = req.body;
    
    //will call service function to send this data
    const result = await BicyleServices.createBicyleIntoDB(bicyleData);
    //send response Bicycle created successfully
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is created succesfully',
      data: result,
    });
});

const getAllBicyle = async (req: Request, res: Response) => {
  try {
    const result = await BicyleServices.getAllBicyleFromDB();

    //send response
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,

      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSpecificByBicyle = async (req: Request, res: Response) => {
  try {
    const { productId: _id } = req.params;

    const result = await BicyleServices.getSpecificByBicyleFromDB(_id);

  
    //send response
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,

      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSpecificByBicyle = async (req: Request, res: Response) => {
  try {
    const { productId: _id } = req.params;
    const updatedData = req.body;
    const result = await BicyleServices.updateBicyleFromDB(_id, updatedData);

    //send response
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,

      data: {},
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteSpecificBicyle = async (req: Request, res: Response) => {
  try {
    
    const { productId: _id } = req.params;

    const result = await BicyleServices.deleteSpecificBicyleFromDB(_id);

    // if (!result) {
    //   return res.status(404).json({ message: 'Bicycle not found' });
    // }
    //send response
    res.status(200).json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};


export const BicyleControllers = {
  createBicyle,
  getAllBicyle,
  getSpecificByBicyle,
  updateSpecificByBicyle,
  deleteSpecificBicyle
};
