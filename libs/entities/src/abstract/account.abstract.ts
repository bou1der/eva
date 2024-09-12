import { Provider } from '@type/enum';
import { UserAbstract } from './user.abstract';

export abstract class AccountAbstract {
  readonly id: string;
  provider: Provider;

  user: UserAbstract;
}
