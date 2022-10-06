import { CreateDiscipleMakerDto } from 'src/disciple-maker/dto/create-disciple-maker.dto';

export const mockDiscipleMaker = {
  _id: '6336439b82f8ee89122f6eb6',
  email: 'ximenes@gmail.com',
  role: 'SUPPORT',
  full_name: 'Ximenes',
  phone: '21981542501',
  createdAt: '2022-09-30T01:17:15.545Z',
  updatedAt: '2022-09-30T01:17:15.545Z',
  __v: 0,
};

export const mockDiscipleMakerUpdatedPhone = {
  _id: '6336439b82f8ee89122f6eb6',
  email: 'ximenes@gmail.com',
  role: 'SUPPORT',
  full_name: 'Ximenes',
  phone: '21981876425',
  createdAt: '2022-09-30T01:17:15.545Z',
  updatedAt: '2022-09-30T01:17:15.545Z',
  __v: 0,
};

export const createDiscipleMakerDto: CreateDiscipleMakerDto = {
  email: 'ximenes@gmail.com',
  password: '12345678',
  role: 'ADMIN',
  full_name: 'Test da Silva',
};

export const createDiscipleMakerDtoSamePhone: CreateDiscipleMakerDto = {
  email: 'ximene@gmail.com',
  password: '12345678',
  role: 'ADMIN',
  full_name: 'Test da Silva',
  phone: '21981542501',
};

export const mockDiscipleMakersList = [
  {
    _id: '632bbb7e6cc1d96c98116c18',
    email: 'thiagoximeneslima332123@gmail.com',
    password: '03051212',
    role: 'ADMIN',
    full_name: 'Test412',
    createdAt: '2022-09-22T01:33:50.683Z',
    updatedAt: '2022-09-22T02:53:43.288Z',
    __v: 0,
  },
  {
    _id: '632bbb7f6cc1d96c98116c1a',
    email: 'thiagoximeneslima332123@gmail.com',
    password: '03051212',
    role: 'DISCIPLE_MAKER',
    full_name: 'Test412',
    createdAt: '2022-09-22T01:33:51.523Z',
    updatedAt: '2022-09-22T01:33:51.523Z',
    __v: 0,
  },
  {
    _id: '632bbc0bb5d89b8eec0f184c',
    email: 'thiagoximeneslima332123@gmail.com',
    password: '03051212',
    role: 'DISCIPLE_MAKER',
    full_name: 'Test412',
    createdAt: '2022-09-22T01:36:11.659Z',
    updatedAt: '2022-09-22T01:36:11.659Z',
    __v: 0,
  },
  {
    _id: '632bc8143e2b6c40f55e9e0b',
    email: 'thiagoximeneslima3321231@gmail.com',
    password: '030512321321',
    role: 'DISCIPLE_MAKER',
    full_name: 'Test412',
    createdAt: '2022-09-22T02:27:32.143Z',
    updatedAt: '2022-09-22T02:27:32.143Z',
    __v: 0,
  },
  {
    _id: '632bca03beff7064123f810a',
    email: 'thiagoximeneslima33221231@gmail.com',
    password: '030512321321',
    role: 'DISCIPLE_MAKER',
    full_name: 'Test412',
    createdAt: '2022-09-22T02:35:47.336Z',
    updatedAt: '2022-09-22T02:35:47.336Z',
    __v: 0,
  },
];

export const mockDiscipleMakerId = '6336439b82f8ee89122f6eb6';

export const mockWrongDiscipleMakerId = '6336439b82f8ee89122';

export const mockNotExistDiscipleMakerId = '6336428b5ff09051fd47f5ad';

export const mockNewPhone = {
  phone: '21981876425',
};
