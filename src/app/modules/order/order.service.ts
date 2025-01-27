import { OrderBicyleModel } from './order.model';
import { OrderBicyle } from './order.interface';


const createOrderIntoDB = async (orderData: OrderBicyle) => {
  const result = await OrderBicyleModel.create(orderData);

  return result;
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