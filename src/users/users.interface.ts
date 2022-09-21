import { Document } from 'mongoose';

export class Users extends Document {
  email: string;
  password: string;
  role: string;
  name: string;
  phone: number;
}
