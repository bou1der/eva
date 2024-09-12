import {
  IsEmail,
  IsEnum,
  IsJWT,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role, Roles } from './enum';

export class UserFilterSchema {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Roles)
  @IsOptional()
  role?: Role;
}

export class AccountFilterSchema {
  @IsString()
  @IsEmail()
  email: string;

  @IsJWT()
  @IsOptional()
  access?: string;

  @IsJWT()
  @IsOptional()
  refresh?: string;
}
