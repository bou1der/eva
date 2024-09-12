import { User } from '@lib/entities';
import { IsJWT, IsNotEmpty } from 'class-validator';

// [TODO]implement\extends without Accounts
export class JwtPayloadDto extends User {}

export class JwtTransferDto {
  @IsJWT()
  @IsNotEmpty()
  access: string;

  // @IsJWT()
  // @IsNotEmpty()
  // refresh:string;
}
