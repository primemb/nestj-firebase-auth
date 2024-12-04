import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum,
  IsAlpha,
} from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  // we should not allow the user to set the role but it is only for the sake of the example
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
