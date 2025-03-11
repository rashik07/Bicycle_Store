
import { OrderBicyleModel } from './order.model';
import { TOrderProduct } from './order.interface';
import AppError from '../../errors/AppError';
import { generateOrderId } from '../../utils/generateID';
import { User } from '../User/user.model';
import httpStatus from 'http-status';
import { BicycleModel } from '../bicycle/bicycle.model';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (order: TOrderProduct, client_ip: string) => {
  const bicycleExists = await BicycleModel.isBicycleExists(
    order.product as unknown as string,
  );

  if (!bicycleExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found');
  }
  const remainingQuantity = bicycleExists.quantity - order.quantity;

  if (remainingQuantity < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Insufficient stock. The order cannot be placed.',
    );
  }

  try {
    // generate order id
    order.orderId = await generateOrderId();

    const newOrder = await OrderBicyleModel.create(order);

    if (!newOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    const user = await User.findById(newOrder.user);

    const shurjopayPayload = {
      amount: order.totalPrice,
      order_id: order.orderId,
      currency: 'BDT',
      customer_name: user?.name,
      customer_address: order.address,
      customer_email: user?.email,
      customer_phone: 'N/A',
      customer_city: 'N/A',
      client_ip,
    };

    const payment = await orderUtils.makePayment(shurjopayPayload);

    let updatedOrder: TOrderProduct | null = null;

    if (payment?.transactionStatus) {
      updatedOrder = await OrderBicyleModel.findOneAndUpdate(
        { orderId: order.orderId },
        {
          $set: {
            transaction: {
              paymentId: payment.sp_order_id,
              transactionStatus: payment.transactionStatus,
            },
          },
        },
        { new: true },
      );
    }

    if (!updatedOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update order');
    }

    return {
      order: updatedOrder,
      payment,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};


const totalRevenue = async ()=>{
    const result = await OrderBicyleModel.aggregate([
        {
          $lookup: {
            from: 'bicycles', // Make sure this matches the collection name in MongoDB
            localField: 'product', // Field in OrderBicycle that references Bicycle
            foreignField: '_id', // Field in Bicycle collection
            as: 'bicycleDetails'
          }
        },
        {
          $unwind: '$bicycleDetails' // Flatten bicycleDetails array
        },
        {
          $project: {
            orderRevenue: { $multiply: ['$bicycleDetails.price', '$quantity'] } // Calculate revenue for each order
          }
        },
        {
          $group: {
            _id: null, // No grouping key
            totalRevenue: { $sum: '$orderRevenue' } // Sum all order revenues
          }
        },
        {
          $project: {
            _id: 0, // Exclude _id from the output
            totalRevenue: 1
          }
        }
      ])
console.log(result)
      return result;

}



export const orderServices = {
    createOrderIntoDB,
    totalRevenue

};