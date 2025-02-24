import { BicycleModel } from '../bicycle/bicycle.model';
// import { BicyleServices } from '../bicycle/bicycle.service';
import { OrderBicyle } from './order.interface';
import { OrderBicyleModel } from './order.model';
import { orderServices } from './order.service';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {

  try {
    const { email, products, address, totalPrice } = req.body as OrderBicyle;
    console.log(req.body);

    // Validate that all bicycles exist
    for (const product of products) {
      const bicycle = await BicycleModel.findById(product._id);
      if (!bicycle) {
        return res.status(400).json({ message: `Bicycle with ID ${product._id} not found` });
      }
   
    }



    // Create order
    const order = new OrderBicyleModel({ email, products, address, totalPrice });
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
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
