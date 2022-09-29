import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Users } from '../users.interface';
import { UsersService } from '../users.service';
import { createUserDto, mockUser } from './mocks';

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
});
