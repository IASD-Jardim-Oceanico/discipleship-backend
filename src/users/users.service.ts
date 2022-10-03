import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const thereIsAnUser = await this.usersModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();

    if (thereIsAnUser) {
      throw new ConflictException('Email already exists');
    }

    return this.usersModel.create(createUserDto);
  }

  async findAll() {
    return this.usersModel.find().exec();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Id');

    const user = await this.usersModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Id');

    const user = await this.usersModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException();

    return this.usersModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string) {
    return this.usersModel.deleteOne({ _id: id }).exec();
  }
}
