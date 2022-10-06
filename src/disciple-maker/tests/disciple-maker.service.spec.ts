import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, ObjectId } from 'mongodb';
import { Model, Query } from 'mongoose';
import { DiscipleMaker } from '../disciple-maker.interface';
import { DiscipleMakerService } from '../disciple-maker.service';
import {
  createDiscipleMakerDto,
  createDiscipleMakerDtoSamePhone,
  mockDiscipleMaker,
  mockDiscipleMakerId,
  mockDiscipleMakersList,
  mockDiscipleMakerUpdatedPhone,
  mockNewPhone,
  mockNotExistDiscipleMakerId,
  mockWrongDiscipleMakerId,
} from './mocks';

describe('DiscipleMakersService', () => {
  let service: DiscipleMakerService;
  let model: Model<DiscipleMaker>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscipleMakerService,
        {
          provide: getModelToken('DiscipleMaker'),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce(mockDiscipleMakersList),
            }),
            findOne: jest.fn(),
            findById: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(mockDiscipleMaker),
              }),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                exec: jest
                  .fn()
                  .mockResolvedValueOnce(mockDiscipleMakerUpdatedPhone),
              }),
            }),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DiscipleMakerService>(DiscipleMakerService);
    model = module.get<Model<DiscipleMaker>>(getModelToken('DiscipleMaker'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new disciple maker', async () => {
    const findDiscipleMaker = jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockDiscipleMaker));

    const newDiscipleMaker = await service.create(createDiscipleMakerDto);

    expect(findDiscipleMaker).toBeCalledTimes(1);
    expect(newDiscipleMaker).toEqual(mockDiscipleMaker);
  });

  it('should throw a conflict exception if email already exists', async () => {
    const findDiscipleMaker = jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockDiscipleMaker),
    } as any);

    try {
      await service.create(createDiscipleMakerDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Email already exists');
    }

    expect(findDiscipleMaker).toBeCalledTimes(1);
  });

  it('should throw a conflict exception if phone already exists', async () => {
    const findDiscipleMaker = jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockDiscipleMaker),
    } as any);

    try {
      await service.create(createDiscipleMakerDtoSamePhone);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Phone already exists');
    }

    expect(findDiscipleMaker).toBeCalledTimes(1);
  });

  it('should list all disciples maker', async () => {
    const findAllDiscipleMaker = await service.findAll();
    expect(findAllDiscipleMaker).toEqual(mockDiscipleMakersList);
  });

  it('should list a specific disciple maker by id', async () => {
    const findDiscipleMaker = await service.findOne(mockDiscipleMakerId);
    expect(findDiscipleMaker).toEqual(mockDiscipleMaker);
  });

  it('should throw a not found exception to a non existent disciple maker', async () => {
    try {
      jest.spyOn(model, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        }),
      } as any);
      await service.findOne(mockNotExistDiscipleMakerId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }

    try {
      await service.update(mockNotExistDiscipleMakerId, mockNewPhone);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw a bad request exception to a wrong disciple maker id', async () => {
    try {
      await service.findOne(mockWrongDiscipleMakerId);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Invalid Id');
    }

    try {
      await service.update(mockWrongDiscipleMakerId, mockNewPhone);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Invalid Id');
    }
  });

  it('should throw a bad request exception to a wrong disciple maker id', async () => {
    try {
      await service.findOne(mockDiscipleMakerId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a specific field by disciple maker id', async () => {
    const updateDiscipleMaker = await service.update(
      mockDiscipleMakerId,
      mockNewPhone,
    );
    expect(updateDiscipleMaker).toEqual(mockDiscipleMakerUpdatedPhone);
  });

  it('should remove a specific disciple maker by id', async () => {
    const removeDiscipleMaker = jest.spyOn(model, 'deleteOne').mockReturnValue({
      exec: jest.fn().mockImplementationOnce(() => mockDiscipleMakerId),
    } as unknown as Query<DeleteResult, DiscipleMaker & { _id: ObjectId }, Record<string, unknown>, DiscipleMaker>);

    await service.remove(mockDiscipleMakerId);

    expect(removeDiscipleMaker).toBeCalled();
    expect(removeDiscipleMaker).toHaveBeenCalledWith({
      _id: mockDiscipleMakerId,
    });
  });
});
