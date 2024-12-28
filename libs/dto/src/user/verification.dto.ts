import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVerifyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class VerifyDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
