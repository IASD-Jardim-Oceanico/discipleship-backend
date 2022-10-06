import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DiscipleMaker } from './disciple-maker.interface';
import { CreateDiscipleMakerDto } from './dto/create-disciple-maker.dto';
import { UpdateDiscipleMakerDto } from './dto/update-disciple-maker.dto';

@Injectable()
export class DiscipleMakerService {
  constructor(
    @InjectModel('DiscipleMaker')
    private readonly discipleMakerModel: Model<DiscipleMaker>,
  ) {}
  async create(createDiscipleMakerDto: CreateDiscipleMakerDto) {
    const thereIsAnDiscipleMaker = await this.discipleMakerModel
      .findOne({
        $or: [
          { email: createDiscipleMakerDto.email },
          { phone: createDiscipleMakerDto.phone },
        ],
      })
      .exec();

    if (thereIsAnDiscipleMaker) {
      const errorMessage =
        createDiscipleMakerDto.email === thereIsAnDiscipleMaker.email
          ? 'Email already exists'
          : 'Phone already exists';
      throw new ConflictException(errorMessage);
    }

    return this.discipleMakerModel.create(createDiscipleMakerDto);
  }

  async findAll() {
    return this.discipleMakerModel.find().exec();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Id');

    const discipleMaker = await this.discipleMakerModel
      .findById(id)
      .select('-password')
      .exec();
    if (!discipleMaker) throw new NotFoundException();

    return discipleMaker;
  }

  async update(id: string, updateDiscipleMakerDto: UpdateDiscipleMakerDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Id');

    const discipleMaker = await this.discipleMakerModel
      .findById(id)
      .select('-password')
      .exec();
    if (!discipleMaker) throw new NotFoundException();

    return this.discipleMakerModel
      .findByIdAndUpdate({ _id: id }, updateDiscipleMakerDto, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string) {
    return this.discipleMakerModel.deleteOne({ _id: id }).exec();
  }
}
