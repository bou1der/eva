import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JwtPayloadDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
