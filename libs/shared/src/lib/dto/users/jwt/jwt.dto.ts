import { IsJWT, IsString } from 'class-validator';

export class JwtDto {
  @IsString()
  @IsJWT()
  access: string;

  @IsString()
  @IsJWT()
  refresh: string;
}
