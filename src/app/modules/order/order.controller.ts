import { BicyleServices } from '../bicyle/bicyle.service';
import { orderServices } from './order.service';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // Find the product by ID
    const productData = await BicyleServices.getSpecificByBicyleFromDB(
      orderData?.product,
    );

    if (!productData) {
      throw {
        message: 'bicycle not found',
        status: false,
        code: 404,
      }
    }

    // Check if sufficient stock is available
    if (productData.quantity < orderData?.quantity) {
      throw {
        message: 'Insufficient stock for the requested quantity',
        status: false,
        code: 400,
      }
    }

    // Update product inventory
    productData.quantity -= orderData?.quantity;
    if (productData.quantity === 0) {
      productData.inStock = false;
    }
    await productData.save();

    //will call service function to send this data
    const result = await orderServices.createOrderIntoDB(orderData);
    //send response
    res.status(200).json({
      status: true,
      message: 'Order created successfully',
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
