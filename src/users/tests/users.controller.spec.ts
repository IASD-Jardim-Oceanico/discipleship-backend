import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';
import { UsersController } from '../users.controller';
import { Users } from '../users.interface';
import { UsersService } from '../users.service';
import { createUserDto, mockUser } from './mocks';

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
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
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
});
