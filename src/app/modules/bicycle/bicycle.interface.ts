import { Model } from 'mongoose';

export type Bicycle = {
 
  
  name: string;
  brand: string;
  price: number;
  type: "Mountain"| "Road"| "Hybrid"| "BMX"| "Electric" ;
  description: string;
  quantity: number;
  inStock: boolean;
  productImg?: string;

};
export interface IBicycle extends Model<Bicycle> {
  // eslint-disable-next-line no-unused-vars
  isBicycleExists(id: string): Promise<Bicycle>;
}