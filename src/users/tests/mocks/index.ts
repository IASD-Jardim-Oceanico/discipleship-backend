import mongoose from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const mockObjectId = new mongoose.Types.ObjectId();

export const mockUser = {
  _id: mockObjectId,
  email: 'fake.email@fake.com',
  password: '12345678',
  role: 'ADMIN',
  full_name: 'Test da Silva',
  createdAt: '2022-09-22T01:33:50.683Z',
  updatedAt: '2022-09-22T02:53:43.288Z',
  __v: 0,
};

export const createUserDto: CreateUserDto = {
  email: 'fake.email@fake.com',
  password: '12345678',
  role: 'ADMIN',
  full_name: 'Test da Silva',
};
