import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Users } from '../users.interface';
import { UsersService } from '../users.service';
import {
  createUserDto,
  mockUser,
  mockUserId,
  mockUsersList,
  mockUserUpdatedPhone,
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
            update: jest.fn().mockResolvedValue(mockUserUpdatedPhone),
            remove: jest.fn(),
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
      .mockImplementationOnce(() => Promise.resolve(mockUserUpdatedPhone));

    const newUser = await service.create(createUserDto);
    expect(findUser).toBeCalledTimes(1);
    expect(newUser).toEqual(mockUserUpdatedPhone);
  });

  it('should list all users', async () => {
    const findAllUsers = await service.findAll();
    expect(findAllUsers).toEqual(mockUsersList);
  });

  it('should list a specific user by id', async () => {
    const findUser = await service.findOne(mockUserId);
    expect(findUser).toEqual(mockUser);
  });
});
