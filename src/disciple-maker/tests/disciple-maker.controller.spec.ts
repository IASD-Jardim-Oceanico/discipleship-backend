import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';
import { DiscipleMakerController } from '../disciple-maker.controller';
import { DiscipleMaker } from '../disciple-maker.interface';
import { DiscipleMakerService } from '../disciple-maker.service';
import {
  createDiscipleMakerDto,
  mockDiscipleMaker,
  mockDiscipleMakerId,
  mockDiscipleMakersList,
  mockDiscipleMakerUpdatedPhone,
} from './mocks';

describe('DiscipleMaker', () => {
  let controller: DiscipleMakerController;
  let service: DiscipleMakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscipleMakerController],
      providers: [
        {
          provide: DiscipleMakerService,
          useValue: {
            create: jest.fn().mockResolvedValue(createDiscipleMakerDto),
            findAll: jest.fn().mockResolvedValue(mockDiscipleMakersList),
            findOne: jest.fn().mockResolvedValue(mockDiscipleMaker),
            update: jest.fn().mockResolvedValue(mockDiscipleMakerUpdatedPhone),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DiscipleMakerController>(DiscipleMakerController);
    service = module.get<DiscipleMakerService>(DiscipleMakerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new disciple maker', async () => {
    const createDiscipleMaker = jest
      .spyOn(service, 'create')
      .mockImplementationOnce(
        async () =>
          mockDiscipleMaker as unknown as Promise<
            DiscipleMaker & { _id: ObjectId }
          >,
      );

    await controller.create(createDiscipleMakerDto);

    expect(createDiscipleMaker).toBeCalled();
    expect(createDiscipleMaker).toHaveBeenCalledWith(createDiscipleMakerDto);
  });

  it('should list all disciple maker', async () => {
    const findAllDiscipleMaker = await controller.findAll();
    expect(findAllDiscipleMaker).toEqual(mockDiscipleMakersList);
  });

  it('should list a specific disciple maker by id', async () => {
    const findDiscipleMaker = await controller.findOne(mockDiscipleMakerId);
    expect(findDiscipleMaker).toEqual(mockDiscipleMaker);
  });

  it('should update a specific field by disciple maker id', async () => {
    const updateDiscipleMaker = await controller.update(mockDiscipleMakerId, {
      phone: '21981876425',
    });
    expect(updateDiscipleMaker).toEqual(mockDiscipleMakerUpdatedPhone);
  });

  it('should remove a specific disciple maker by id', async () => {
    const removeDiscipleMaker = jest
      .spyOn(service, 'remove')
      .mockImplementationOnce(
        async () =>
          mockDiscipleMakerId as unknown as Promise<{
            acknowledged: boolean;
            deletedCount: number;
          }>,
      );

    await controller.remove(mockDiscipleMakerId);

    expect(removeDiscipleMaker).toBeCalled();
    expect(removeDiscipleMaker).toHaveBeenCalledWith(mockDiscipleMakerId);
  });
});
