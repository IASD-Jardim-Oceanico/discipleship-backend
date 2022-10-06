import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscipleMakerDto } from './create-disciple-maker.dto';

export class UpdateDiscipleMakerDto extends PartialType(
  CreateDiscipleMakerDto,
) {}
