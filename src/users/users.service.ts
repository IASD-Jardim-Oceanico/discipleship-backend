import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersModel.create(createUserDto);
  }

  async findAll() {
    return this.usersModel.find().exec();
  }

  async findOne(id: string) {
    return this.usersModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  async remove(id: string) {
    return this.usersModel.deleteOne({ _id: id }).exec();
  }
}
