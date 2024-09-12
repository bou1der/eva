import { Role } from '@type/enum';
import { AccountAbstract } from './account.abstract';

export abstract class UserAbstract {
  readonly id: string;
  readonly email: string;
  role: Role;
  accounts?: AccountAbstract[];
  verified: boolean;
}
