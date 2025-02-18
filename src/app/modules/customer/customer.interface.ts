import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};



export type TCustomer = {
 
  user: Types.ObjectId;
  name?: TUserName;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  profileImg?: string;
  isDeleted: boolean;

};

//for creating static
export interface CustomerModel extends Model<TCustomer> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TCustomer | null>;
}
