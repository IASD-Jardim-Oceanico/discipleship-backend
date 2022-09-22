import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UsersRole } from '../entities/user.entity';

export class CreateUserDto {
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
  @IsEnum(UsersRole)
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @IsNumber()
  @IsOptional()
  @Length(11, 11, {
    message: 'Must be a valid cellphone number',
  })
  readonly phone: number;
}
