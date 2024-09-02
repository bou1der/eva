import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class verifyMail {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
