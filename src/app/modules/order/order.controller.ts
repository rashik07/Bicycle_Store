
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { orderServices } from './order.service';
import sendResponse from '../../utils/sendResponse';

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
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentId } = req.params;
  const result = await orderServices.verifyPayment(paymentId);
  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await orderServices.getAllOrdersFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data,
    meta,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  //use params
  const email = req.params.email;
  const result = await orderServices.getMyOrdersFromDB(email);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const deleteSpecificBicycle = catchAsync(async (req, res) => {
  const { orderId: _id } = req.params;

  const result = await orderServices.deleteSpecificOrderFromDB(_id);

  
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order deleted successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getTotalRevenue,
  verifyPayment,
  getAllOrders,
  getMyOrders,
  // updateSpecificByBicyle,
  deleteSpecificBicycle
};
