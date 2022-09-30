import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';
import { UsersController } from '../users.controller';
import { Users } from '../users.interface';
import { UsersService } from '../users.service';
import {
  createUserDto,
  mockUser,
  mockUserId,
  mockUsersList,
  mockUserUpdatedPhone,
} from './mocks';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(createUserDto),
            findAll: jest.fn().mockResolvedValue(mockUsersList),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUserUpdatedPhone),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUser = jest
      .spyOn(service, 'create')
      .mockImplementationOnce(
        async () => mockUser as unknown as Promise<Users & { _id: ObjectId }>,
      );

    await controller.create(createUserDto);

    expect(createUser).toBeCalled();
    expect(createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should list all users', async () => {
    const findAllUsers = await controller.findAll();
    expect(findAllUsers).toEqual(mockUsersList);
  });

  it('should list a specific user by id', async () => {
    const findUser = await controller.findOne(mockUserId);
    expect(findUser).toEqual(mockUser);
  });

  it('should update a specific field by user id', async () => {
    const updateUser = await controller.update(mockUserId, {
      phone: '21981876425',
    });
    expect(updateUser).toEqual(mockUserUpdatedPhone);
  });

  it('should remove a specific user by id', async () => {
    const removeUser = jest.spyOn(service, 'remove').mockImplementationOnce(
      async () =>
        mockUserId as unknown as Promise<{
          acknowledged: boolean;
          deletedCount: number;
        }>,
    );

    await controller.remove(mockUserId);

    expect(removeUser).toBeCalled();
    expect(removeUser).toHaveBeenCalledWith(mockUserId);
  });
});
