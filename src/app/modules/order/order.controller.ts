/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import catchAsync from '../../utils/catchAsync';
import { orderServices } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await orderServices.createOrderIntoDB(orderData, req.ip!);
  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.totalRevenue();

    //send response
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,

      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const OrderControllers = {
  createOrder,
  getTotalRevenue,
  // getAllBicyle,
  // getSpecificByBicyle,
  // updateSpecificByBicyle,
  // deleteSpecificBicyle
};
