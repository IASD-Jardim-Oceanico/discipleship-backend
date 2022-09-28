import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Users } from './users.interface';
import { UsersService } from './users.service';

const mockUser = {
  email: 'fake.email@fake.com',
  password: '12345678',
  role: 'ADMIN',
  full_name: 'Test da Silva',
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<Users>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const findUser = jest.spyOn(userModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    jest
      .spyOn(userModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser));

    const newUser = await service.create(mockUser);
    expect(findUser).toBeCalledTimes(1);
    expect(newUser).toEqual(mockUser);
  });
});
