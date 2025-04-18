import { OrderBicyleModel } from './order.model';
import { TOrderProduct } from './order.interface';
import AppError from '../../errors/AppError';
import { generateOrderId } from '../../utils/generateID';
import { User } from '../User/user.model';
import httpStatus from 'http-status';
import { BicycleModel } from '../bicycle/bicycle.model';
import { orderUtils } from './order.utils';
import QueryBuilder from '../../builder/QueryBuilder';

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
    // return newOrder;
    if (!newOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    const user = await User.findOne({ email: newOrder.user });

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

const verifyPayment = async (paymentId: string) => {
  const payment = await orderUtils.verifyPayment(paymentId);

  if (payment.length) {
    await OrderBicyleModel.findOneAndUpdate(
      {
        'transaction.paymentId': paymentId,
      },
      {
        'transaction.bank_status': payment[0].bank_status,
        'transaction.sp_code': payment[0].sp_code,
        'transaction.sp_message': payment[0].sp_message,
        'transaction.method': payment[0].method,
        'transaction.date_time': payment[0].date_time,
        'transaction.transactionStatus': payment[0].transaction_status,
        status:
          payment[0].bank_status == 'Success'
            ? 'paid'
            : payment[0].bank_status == 'Failed'
              ? 'pending'
              : payment[0].bank_status == 'Cancel'
                ? 'cancelled'
                : '',
      },
    );
  }

  if (payment[0].bank_status === 'Success') {
    // check if order was placed before
    const orderExists = await OrderBicyleModel.findOne({
      'transaction.paymentId': paymentId,
    });

    if (!orderExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Order was not placed correctly',
      );
    }

    const bicycleExists = await BicycleModel.isBicycleExists(
      orderExists.product as unknown as string,
    );

    if (!bicycleExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Product was not found in order',
      );
    }

    const remainingQuantity = bicycleExists.quantity - orderExists.quantity;

    // update bicycle quantity (first transaction)
    const updatedBicycle = await BicycleModel.findOneAndUpdate(
      { _id: orderExists.product },
      {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0 ? true : false,
      },
      { new: true },
    );

    if (!updatedBicycle) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update bicycle stock',
      );
    }
  }

  return payment;
};

const totalRevenue = async () => {
  const result = await OrderBicyleModel.aggregate([
    {
      $lookup: {
        from: 'bicycles', // Make sure this matches the collection name in MongoDB
        localField: 'product', // Field in OrderBicycle that references Bicycle
        foreignField: '_id', // Field in Bicycle collection
        as: 'bicycleDetails',
      },
    },
    {
      $unwind: '$bicycleDetails', // Flatten bicycleDetails array
    },
    {
      $project: {
        orderRevenue: { $multiply: ['$bicycleDetails.price', '$quantity'] }, // Calculate revenue for each order
      },
    },
    {
      $group: {
        _id: null, // No grouping key
        totalRevenue: { $sum: '$orderRevenue' }, // Sum all order revenues
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id from the output
        totalRevenue: 1,
      },
    },
  ]);
 
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderBicyleModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await orderQuery.modelQuery.populate('product');
  const meta = await orderQuery.countTotal();
  return {
    data,
    meta,
  };
};
const getMyOrdersFromDB = async (email: string) => {
  const result = await OrderBicyleModel.find({ user: email }).populate(
    'product',
  );
  return result;
};

const deleteSpecificOrderFromDB = async (_id: string) => {
  const result = await OrderBicyleModel.findOneAndDelete({ _id });

  return result;
};
export const orderServices = {
  createOrderIntoDB,
  verifyPayment,
  getAllOrdersFromDB,
  totalRevenue,
  getMyOrdersFromDB,
  deleteSpecificOrderFromDB,
};
