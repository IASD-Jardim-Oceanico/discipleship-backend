import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, ObjectId } from 'mongodb';
import { Model, Query } from 'mongoose';
import { Users } from '../users.interface';
import { UsersService } from '../users.service';
import {
  createUserDto,
  mockNewPhone,
  mockNotExistUserId,
  mockUser,
  mockUserId,
  mockUsersList,
  mockUserUpdatedPhone,
  mockWrongUserId,
} from './mocks';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce(mockUsersList),
            }),
            findOne: jest.fn(),
            findById: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(mockUser),
              }),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(mockUserUpdatedPhone),
              }),
            }),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<Users>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const findUser = jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser));

    const newUser = await service.create(createUserDto);
    expect(findUser).toBeCalledTimes(1);
    expect(newUser).toEqual(mockUser);
  });

  it('should throw a conflict exception', async () => {
    const findUser = jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    try {
      await service.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Email already exists');
    }
    expect(findUser).toBeCalledTimes(1);
  });

  it('should list all users', async () => {
    const findAllUsers = await service.findAll();
    expect(findAllUsers).toEqual(mockUsersList);
  });

  it('should list a specific user by id', async () => {
    const findUser = await service.findOne(mockUserId);
    expect(findUser).toEqual(mockUser);
  });

  it('should throw a not found exception to a non existent user', async () => {
    try {
      jest.spyOn(model, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        }),
      } as any);
      await service.findOne(mockNotExistUserId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }

    try {
      await service.update(mockNotExistUserId, mockNewPhone);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw a bad request exception to a wrong user id', async () => {
    try {
      await service.findOne(mockWrongUserId);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Invalid Id');
    }

    try {
      await service.update(mockWrongUserId, mockNewPhone);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Invalid Id');
    }
  });

  it('should throw a bad request exception to a wrong user id', async () => {
    try {
      await service.findOne(mockUserId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a specific field by user id', async () => {
    const updateUser = await service.update(mockUserId, mockNewPhone);
    expect(updateUser).toEqual(mockUserUpdatedPhone);
  });

  it('should remove a specific user by id', async () => {
    const removeUser = jest.spyOn(model, 'deleteOne').mockReturnValue({
      exec: jest.fn().mockImplementationOnce(() => mockUserId),
    } as unknown as Query<DeleteResult, Users & { _id: ObjectId }, Record<string, unknown>, Users>);

    await service.remove(mockUserId);

    expect(removeUser).toBeCalled();
    expect(removeUser).toHaveBeenCalledWith({ _id: mockUserId });
  });
});
