import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DiscipleMakerRole } from '../entities/disciple-maker.entity';

export class CreateDiscipleMakerDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(DiscipleMakerRole)
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly full_name: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Pass a valid phone number' })
  readonly phone?: string;
}
