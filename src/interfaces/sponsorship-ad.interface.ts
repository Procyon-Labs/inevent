import { Types, Document } from 'mongoose';
import { IUser } from './user.interface';

export interface ISponsorshipAd extends Document {
  user: string | Types.ObjectId | IUser;
  title: string;
  description: string;
  category: string;
  amount: number;
  quantity: number;
  image: string;
}
