import { OrderBicyleModel } from "../modules/order/order.model";


// order id
export const generateOrderId = async () => {
  const findLastOrderId = async () => {
    const lastOrder = await OrderBicyleModel.findOne({}, { orderId: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();

    return lastOrder?.orderId;
  };
  let currentId = '0';
  const lastOrderId = await findLastOrderId();

  if (lastOrderId) {
    currentId = lastOrderId.substring(6); 
  }
  
  const incrementId = `Order-${(Number(currentId) + 1).toString().padStart(4, '0')}`;
  return incrementId;
};

